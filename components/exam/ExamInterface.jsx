"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";

import TimerDisplay from "@/components/exam/TimerDisplay";
import QuestionNavigator from "@/components/exam/QuestionNavigator";
import QuestionRenderer from "@/components/exam/QuestionRenderer";
import SubmitConfirmModal from "@/components/exam/SubmitConfirmModal";

export default function ExamInterface({ exam, questions = [], attemptId, startedAt, onSubmit }) {
  const router = useRouter();

  // ══ STATE ═══════════════════════════════════════════════
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isAutoSubmit, setIsAutoSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const autoSubmittedRef = useRef(false);

  // ══ DERIVED VALUES ══════════════════════════════════════
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const answeredCount = Object.keys(selectedAnswers).length;
  const markedCount = markedForReview.size;
  const skippedCount = totalQuestions - answeredCount;

  // ══ HANDLERS ════════════════════════════════════════════
  const handleAnswerSelect = useCallback((questionId, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  }, []);

  const handleMarkToggle = useCallback((questionId) => {
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  }, []);

  const goToQuestion = useCallback(
    (index) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentIndex(index);
      }
    },
    [totalQuestions]
  );

  const goToPrevious = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(totalQuestions - 1, i + 1));
  }, [totalQuestions]);

  const handleSubmitClick = () => {
    setIsAutoSubmit(false);
    setShowSubmitModal(true);
  };

  const handleTimeEnd = useCallback(() => {
    if (autoSubmittedRef.current) return;
    autoSubmittedRef.current = true;

    setIsAutoSubmit(true);
    setShowSubmitModal(true);
  }, []);

  const handleConfirmSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const startTime = new Date(startedAt).getTime();
      const endTime = new Date().getTime();
      const timeTakenSeconds = Math.round((endTime - startTime) / 1000);

      const result = await onSubmit(selectedAnswers, timeTakenSeconds);

      const finalAttemptId = result?.attemptId || attemptId;
      router.push(`/exams/${exam.id}/result/${finalAttemptId}`);
    } catch (err) {
      console.error("❌ Submit error:", err);
      setIsSubmitting(false);
      setShowSubmitModal(false);
      alert("জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  const handleCancelSubmit = () => {
    if (!isSubmitting) {
      setShowSubmitModal(false);
      setIsAutoSubmit(false);
    }
  };

  // ══ RENDER ══════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* TOP BAR */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <h1 className="text-sm font-semibold text-[#1F2937] truncate flex-1 min-w-0">
            {exam?.title || "পরীক্ষা"}
          </h1>

          <div className="shrink-0">
            <TimerDisplay
              durationMinutes={exam?.duration_minutes || 60}
              startedAt={startedAt}
              onTimeEnd={handleTimeEnd}
            />
          </div>

          <button
            onClick={handleSubmitClick}
            disabled={isSubmitting}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2
                       bg-primary hover:bg-primary-dark text-white text-sm
                       font-medium rounded-lg transition-all duration-200
                       shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30
                       active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed
                       cursor-pointer"
          >
            <FaPaperPlane className="text-xs" />
            <span className="hidden sm:inline">জমা দিন</span>
          </button>
        </div>
      </div>

      {/* QUESTION NAVIGATOR */}
      <QuestionNavigator
        questions={questions}
        currentIndex={currentIndex}
        selectedAnswers={selectedAnswers}
        markedForReview={markedForReview}
        onQuestionClick={goToQuestion}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 max-w-3xl mx-auto w-full">
        <div className="bg-white my-2 mx-3 sm:mx-4 rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
          <QuestionRenderer
            question={currentQuestion}
            questionIndex={currentIndex}
            totalQuestions={totalQuestions}
            selectedAnswer={selectedAnswers[currentQuestion?.id] || null}
            isMarked={markedForReview.has(currentQuestion?.id)}
            onAnswerSelect={handleAnswerSelect}
            onMarkToggle={handleMarkToggle}
            onPrevious={goToPrevious}
            onNext={goToNext}
            isFirst={currentIndex === 0}
            isLast={currentIndex === totalQuestions - 1}
          />
        </div>

        <div className="h-4" />
      </div>

      {/* SUBMIT MODAL */}
      <SubmitConfirmModal
        isOpen={showSubmitModal}
        isAutoSubmit={isAutoSubmit}
        stats={{
          total: totalQuestions,
          answered: answeredCount,
          skipped: skippedCount,
          marked: markedCount,
        }}
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
