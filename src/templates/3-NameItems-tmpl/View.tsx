"use client";

import { ViewActivityProps } from "@/components/templates/ViewActivityLayout";
import { useEffect, useState } from "react";
import { ActivityDataType } from "./Create";

/*
Activity input example - Fresh activity
{
  "items": [
    { "image": "https://example.com/dog.jpg", "name": "dog" },
    { "image": "https://example.com/cat.jpg", "name": "cat" }
  ],
  "showAnswerList": true
}

Activity input example - Student progress
{
  "items": [
    { "image": "https://example.com/dog.jpg", "name": "dog" },
    { "image": "https://example.com/cat.jpg", "name": "cat" }
  ],
  "showAnswerList": true,
  "answers": ["dog", "horse"]
}
*/

export default function NameItems(props: ViewActivityProps) {
  const { activityData, resetActivity, resultIndicator, setResetActivity, setResultValidation, setResultData } = props;

  // Central state for all activity data
  const [nameData, setNameData] = useState<ActivityDataType & { answers?: string[] }>({
    items: [],
    showAnswerList: true,
    answers: []
  });

  // Track student answers
  const [answers, setAnswers] = useState<string[]>([]);

  // Sync nameData when activityData changes
  useEffect(() => {
    if (activityData && activityData.items) {
      setNameData(JSON.parse(JSON.stringify(activityData)));
      if (activityData.answers) {
        setAnswers(activityData.answers);
      } else {
        setAnswers(new Array(activityData.items.length).fill(""));
      }
    }
  }, [activityData]);

  // Reset effect
  useEffect(() => {
    if (resetActivity) {
      if (activityData && activityData.items) {
        setAnswers(new Array(activityData.items.length).fill(""));
      }
      setResetActivity(false);
    }
  }, [resetActivity, activityData, setResetActivity]);

  // Validation effect
  useEffect(() => {
    const filledCount = answers.filter(answer => answer.trim()).length;
    const totalItems = nameData.items.length;

    if (filledCount === 0) {
      setResultValidation({ status: false, message: "Please name all items." });
    } else if (filledCount < totalItems) {
      setResultValidation({ status: false, message: `You still have ${totalItems - filledCount} items left to name.` });
    } else {
      setResultValidation({ status: true, message: "All items have been named! You can submit your answers." });
    }
  }, [answers, nameData.items.length, setResultValidation]);

  // Result reporting effect
  useEffect(() => {
    let correctAnswers = 0;
    let totalAnswers = answers.filter(answer => answer.trim()).length;

    answers.forEach((answer, index) => {
      if (answer.trim()) {
        if (answer.toLowerCase() === nameData.items[index].name.toLowerCase()) {
          correctAnswers++;
        }
      }
    });

    const score = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
    const summary = `Correctly named ${correctAnswers} out of ${totalAnswers} items.`;

    setResultData({
      score: {
        baseScore: score,
        maxScore: 100,
        summery: summary
      },
      data: {
        ...nameData,
        answers: answers
      }
    });
  }, [answers, nameData, setResultData]);

  // Handle answer input
  function handleAnswerChange(index: number, value: string) {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = value;
      return newAnswers;
    });
  }

  // Get input styling based on result indicator state
  function getInputStyling(index: number): string {
    const answer = answers[index];
    if (!answer) return 'bg-white border-gray-300';

    if (resultIndicator) {
      const isCorrect = answer.toLowerCase() === nameData.items[index].name.toLowerCase();
      return isCorrect
        ? 'border-green-500 bg-green-50 text-green-800'
        : 'border-red-500 bg-red-50 text-red-800';
    }

    return 'border-blue-300';
  }

  return (
    <section className="mb-6 bg-yellow-950/20 p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Name the Items</h2>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {nameData.items.map((item, index) => (
          <div key={index} className="bg-white/10 p-4 rounded-lg  shadow-md">
            <div className="aspect-square mb-4 bg-white rounded border border-gray-400 flex items-center justify-center overflow-hidden">
              <img
                src={item.image}
                alt={`Item ${index + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <input
              type="text"
              className={`w-full p-2 border-2 rounded text-center font-medium focus:outline-none ${getInputStyling(index)}`}
              placeholder="Enter name..."
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Answer List */}
      {nameData.showAnswerList && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Available Answers</h3>
          <div className="flex flex-wrap gap-2">
            {nameData.items.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-white text-gray-800 rounded-lg border border-blue-200 font-medium"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
