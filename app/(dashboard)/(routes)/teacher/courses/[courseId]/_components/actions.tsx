"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export function Actions({ disabled, courseId, isPublished }: ActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `/api/courses/${courseId}/${isPublished ? "unpublish" : "publish"}`,
        {
          isPublished: !isPublished,
        }
      );
      toast.success(
        isPublished
          ? "Course unpublished successfully!"
          : "Course published successfully!"
      );
      if (!isPublished) {
        confetti.onOpen();
      }
      router.refresh();
    } catch {
      toast.error(
        isPublished ? "Failed to unpublish Course" : "Failed to publish Course"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted successfully!");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch {
      toast.error("Failed to delete Course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
}
