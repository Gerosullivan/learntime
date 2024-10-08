export type StudyState =
  | "home"
  | "topic_new"
  | "topic_name_saved"
  | "topic_describe_upload"
  | "topic_describe_upload_error"
  | "topic_no_description_in_db"
  | "topic_generated"
  | "topic_save"
  | "topic_save_error"
  | "topic_saved"
  | "topic_default"
  | "topic_default_quiz"
  | "recall_first_attempt"
  | "recall_first_attempt_result"
  | "recall_final_suboptimal_feedback"
  | "recall_answer_hints"
  | "recall_hints_quiz_finish"
  | "recall_show_hints"
  | "recall_finished"
  | "reviewing"
  | "quick_quiz_ready"
  | "quick_quiz_question"
  | "quick_quiz_user_answer"
  | "quick_quiz_answer"
  | "quick_quiz_answer_next"
  | "quick_quiz_finished"

export interface QuickResponse {
  quickText: string
  newStudyState: StudyState
}

interface StudyStateObject {
  name: StudyState
  message: string
  quickResponses?: QuickResponse[]
  hideInput?: boolean
}

export const studyStates: StudyStateObject[] = [
  {
    name: "topic_new",
    message: "Enter your topic name below to start."
  },
  {
    name: "topic_describe_upload",
    message: "What updates should we make to the topic study sheet?"
  },
  {
    name: "topic_no_description_in_db",
    message: "No topic description found. Please add topic description below."
  },
  {
    name: "topic_describe_upload_error",
    message: "Server error saving topic content."
  },
  {
    name: "topic_name_saved",
    message: `Topic name saved. Please describe your topic below.
  You can also upload files ⨁ as source material for me to generate your study notes.`
  },
  {
    name: "topic_save_error",
    message: "Error: No chat selected."
  },
  {
    name: "topic_generated",
    message: "{{LLM}}",
    hideInput: true,
    quickResponses: [
      {
        quickText: "Save study sheet.",
        newStudyState: "topic_save"
      },
      {
        quickText: "Edit topic.",
        newStudyState: "topic_describe_upload"
      }
    ]
  },
  {
    name: "topic_save",
    message: "{{DB}}",
    hideInput: true,
    quickResponses: [
      {
        quickText: "Start recall now.",
        newStudyState: "recall_first_attempt"
      },
      {
        quickText: "Edit topic.",
        newStudyState: "topic_describe_upload"
      }
    ]
  },
  {
    name: "topic_saved",
    message: "Save successful.",
    hideInput: true,
    quickResponses: [
      {
        quickText: "Start recall now.",
        newStudyState: "recall_first_attempt"
      },
      {
        quickText: "Edit topic.",
        newStudyState: "topic_describe_upload"
      }
    ]
  },
  {
    name: "topic_default",
    message: `Welcome back.
Please select from the options below.`,
    hideInput: true,
    quickResponses: [
      {
        quickText: "Start recall now.",
        newStudyState: "recall_first_attempt"
      },
      {
        quickText: "Show study sheet.",
        newStudyState: "reviewing"
      }
    ]
  },
  {
    name: "topic_default_quiz",
    message: `Welcome back.
Please select from the options below.`,
    hideInput: true,
    quickResponses: [
      {
        quickText: "Start recall now.",
        newStudyState: "recall_first_attempt"
      },
      {
        quickText: "Show study sheet.",
        newStudyState: "reviewing"
      },
      {
        quickText: "Start topic quick quiz.",
        newStudyState: "quick_quiz_ready"
      }
    ]
  },
  {
    name: "recall_first_attempt",
    message: "Try to recall as much as you can. Good luck!"
  },
  {
    name: "recall_hints_quiz_finish",
    message: "{{LLM}}",
    hideInput: true,
    quickResponses: [
      {
        quickText: "Show all hints.",
        newStudyState: "recall_show_hints"
      },
      {
        quickText: "Start topic quick quiz.",
        newStudyState: "quick_quiz_ready"
      },
      {
        quickText: "Show final feedback.",
        newStudyState: "recall_final_suboptimal_feedback"
      }
    ]
  },
  {
    name: "recall_final_suboptimal_feedback",
    message: "{{LLM}}",
    hideInput: true,
    quickResponses: [
      {
        quickText: "Show study sheet.",
        newStudyState: "reviewing"
      }
    ]
  },
  {
    name: "recall_show_hints",
    message: "{{LLM}}"
  },
  {
    name: "recall_first_attempt_result",
    message: "Saved score and gap list. Creating feedback...",
    hideInput: true
  },
  {
    name: "recall_answer_hints",
    message: "{{LLM}}"
  },

  {
    name: "recall_finished",
    message: "{{LLM}}",
    hideInput: true,
    quickResponses: [
      {
        quickText: "Show study sheet.",
        newStudyState: "reviewing"
      }
    ]
  },
  {
    name: "reviewing",
    message: "{{topicDescription}}",
    quickResponses: [
      {
        quickText: "Edit topic.",
        newStudyState: "topic_describe_upload"
      },
      {
        quickText: "Start recall now.",
        newStudyState: "recall_first_attempt"
      }
    ]
  },
  {
    name: "quick_quiz_ready",
    message: `Are you ready to start a 🔥 Quick quiz?`,
    hideInput: true,
    quickResponses: [
      {
        quickText: "Next question.",
        newStudyState: "quick_quiz_question"
      }
    ]
  },
  {
    name: "quick_quiz_question",
    message: "{{LLM}}"
  },
  {
    name: "quick_quiz_user_answer",
    message: "{{LLM}}",
    quickResponses: [
      {
        quickText: "I don't know.",
        newStudyState: "quick_quiz_answer"
      }
    ]
  },
  {
    name: "quick_quiz_answer",
    message: "{{LLM}}"
  },
  {
    name: "quick_quiz_answer_next",
    message: "{{LLM}}",
    hideInput: true,
    quickResponses: [
      {
        quickText: "Another question.",
        newStudyState: "quick_quiz_question"
      }
    ]
  },
  {
    name: "quick_quiz_finished",
    message: "{{LLM}}",
    hideInput: true
  }
]

export function getQuickResponses(studyState: StudyState): QuickResponse[] {
  const stateObject = studyStates.find(state => state.name === studyState)

  return stateObject?.quickResponses ?? []
}

export function getQuickResponseByUserText(
  userText: string
): QuickResponse | undefined {
  for (const state of studyStates) {
    const quickResponse = state.quickResponses?.find(
      qr => qr.quickText === userText
    )
    if (quickResponse) {
      return quickResponse
    }
  }
  return undefined
}

// return the new StudyStateObject based on name
export function getStudyStateObject(
  name: StudyState
): StudyStateObject | undefined {
  return studyStates.find(state => state.name === name)
}

// StudyStateObject is hideInput true
export function isHideInput(name: StudyState): boolean {
  const stateObject = studyStates.find(state => state.name === name)
  return stateObject?.hideInput ?? false
}
