"use client";

import { ViewActivityProps } from "@/components/templates/ViewActivityLayout";
import { useEffect, useState } from "react";
import { ActivityDataType } from "./Create";

/*
Activity input example - Fresh activity
{
  "paragraph": "The quick brown fox jumps over the lazy [[[dog]]]. The [[[fox]]] was very fast and the [[[dog]]] was very [[[slow]]]. They lived in a beautiful [[[forest]]] near the river.",
  "options": ["dog", "fox", "dog", "slow", "forest", "fast", "lazy", "city"],
  "used": []
}

Activity input example - Student progress
{
  "paragraph": "The quick brown fox jumps over the lazy [[[dog]]]. The [[[fox]]] was very fast and the [[[dog]]] was very [[[slow]]]. They lived in a beautiful [[[forest]]] near the river.",
  "options": ["forest", "fast", "lazy", "city"],
  "used": ["dog", "fox", "dog", "slow", "cave"]
}
*/

/*
Activity output example - Same format as input
{
  "paragraph": "The quick brown fox jumps over the lazy [[[dog]]]. The [[[fox]]] was very fast and the [[[dog]]] was very [[[slow]]]. They lived in a beautiful [[[forest]]] near the river.",
  "options": ["forest", "fast", "lazy", "city"],
  "used": ["dog", "fox", "dog", "slow", "cave"]
}
*/

export default function FillWords(props: ViewActivityProps) {

  const { activityData, resetActivity, resultIndicator, setResetActivity, setResultValidation, setResultData } = props;

  // Central state for all activity data
  const [fillData, setFillData] = useState<ActivityDataType>({
    paragraph: "",
    options: [],
    used: []
  });

  // Track filled words for each blank
  const [filledWords, setFilledWords] = useState<string[]>([]);

  // Track used option indices (which specific options have been used)
  const [usedOptionIndices, setUsedOptionIndices] = useState<Set<number>>(new Set());

  // Track which option index is used for each blank
  const [usedOptionIndexPerBlank, setUsedOptionIndexPerBlank] = useState<(number | undefined)[]>([]);

  // Sync fillData when activityData changes (for async loads)
  useEffect(() => {
    // Validate activityData
    if (!activityData || !activityData.paragraph || !Array.isArray(activityData.options)) {
      setFillData({ paragraph: "", options: [], used: [] });
      setFilledWords([]);
      setUsedOptionIndices(new Set());
      setUsedOptionIndexPerBlank([]);
      setResultValidation({ status: false, message: "Invalid activity data provided." });
      return;
    }

    setFillData(JSON.parse(JSON.stringify(activityData)));
    // Initialize filledWords and usedOptionIndexPerBlank from used array if it exists (student progress)
    if (activityData.used && activityData.used.length > 0) {
      const newFilledWords = [...activityData.used];
      const newUsedIndices = new Set<number>();
      const newUsedOptionIndexPerBlank = new Array(activityData.used.length).fill(undefined);

      activityData.used.forEach((usedWord: string, blankIndex: number) => {
        // Find the next available instance of this word in options
        for (let i = 0; i < activityData.options.length; i++) {
          if (activityData.options[i].toLowerCase() === usedWord.toLowerCase() && !newUsedIndices.has(i)) {
            newUsedIndices.add(i);
            newUsedOptionIndexPerBlank[blankIndex] = i;
            break;
          }
        }
      });

      setFilledWords(newFilledWords);
      setUsedOptionIndices(newUsedIndices);
      setUsedOptionIndexPerBlank(newUsedOptionIndexPerBlank);
    } else {
      setFilledWords([]);
      setUsedOptionIndices(new Set());
      setUsedOptionIndexPerBlank([]);
    }
  }, [activityData, setResultValidation]);

  // Reset effect
  useEffect(() => {
    if (resetActivity) {
      if (activityData && activityData.paragraph && Array.isArray(activityData.options)) {
        setFillData(JSON.parse(JSON.stringify(activityData)));
        // Reset to empty arrays for fresh start
        setFilledWords([]);
        setUsedOptionIndices(new Set());
        setUsedOptionIndexPerBlank([]);
      }
      setResetActivity(false);
    }
  }, [resetActivity, activityData, setResetActivity]);

  // Extract blanks from paragraph
  function extractBlanks() {
    const blanks: Array<{ word: string, startIndex: number, endIndex: number, blankIndex: number }> = [];
    const regex = /\[\[\[([^\]]+)\]\]\]/g;
    let match;
    let blankIndex = 0;
    
    while ((match = regex.exec(fillData.paragraph)) !== null) {
      blanks.push({
        word: match[1],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        blankIndex: blankIndex++
      });
    }
    
    return blanks;
  }

  // Check if a word is available in options (simple check like cross-out logic)
  function isWordAvailable(word: string): boolean {
    if (!word) return true;
    // Check if this word exists in options and hasn't been used yet
    return fillData.options.some((option, index) => 
      option.toLowerCase() === word.toLowerCase() && !usedOptionIndices.has(index)
    );
  }

  // Handle input change for a specific blank
  function handleInputChange(blankIndex: number, value: string) {
    setFilledWords(prev => {
      const newFilledWords = [...prev];
      newFilledWords[blankIndex] = value;
      return newFilledWords;
    });

    // Update used option indices
    setUsedOptionIndices(prev => {
      const newUsedIndices = new Set(prev);
      
      // Remove previous index for this blank
      const prevIndex = usedOptionIndexPerBlank[blankIndex];
      if (prevIndex !== undefined) {
        newUsedIndices.delete(prevIndex);
      }
      
      // Add new index if word is valid
      let newIndex: number | undefined;
      if (value && isWordAvailable(value)) {
        for (let i = 0; i < fillData.options.length; i++) {
          if (fillData.options[i].toLowerCase() === value.toLowerCase() && !newUsedIndices.has(i)) {
            newIndex = i;
            newUsedIndices.add(i);
            break;
          }
        }
      }
      
      setUsedOptionIndexPerBlank(prev => {
        const newIndices = [...prev];
        newIndices[blankIndex] = newIndex;
        return newIndices;
      });
      
      return newUsedIndices;
    });
  }

  // Validation effect
  useEffect(() => {
    const blanks = extractBlanks();
    const filledCount = filledWords.filter(word => word && word.trim()).length;
    const totalBlanks = blanks.length;

    if (filledCount === 0) {
      setResultValidation({ status: false, message: "Please fill in all the missing words." });
    } else if (filledCount < totalBlanks) {
      setResultValidation({ status: false, message: `You still have ${totalBlanks - filledCount} words left, complete them first.` });
    } else {
      setResultValidation({ status: true, message: "All words have been filled! You can submit your answer." });
    }
  }, [filledWords, fillData, setResultValidation]);

  // Result reporting effect
  useEffect(() => {
    const blanks = extractBlanks();
    let correctAnswers = 0;
    let totalAnswers = filledWords.filter(word => word && word.trim()).length;

    blanks.forEach((blank, index) => {
      const filledWord = filledWords[index];
      if (filledWord && filledWord.trim()) {
        // Check if the filled word matches the expected word from the blank
        if (filledWord.toLowerCase() === blank.word.toLowerCase()) {
          correctAnswers++;
        }
      }
    });

    const score = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
    const summary = `Correctly filled ${correctAnswers} out of ${totalAnswers} words.`;

    setResultData({
      score: {
        baseScore: score,
        maxScore: 100,
        summery: summary
      },
      data: {
        paragraph: fillData.paragraph,
        options: fillData.options,
        used: filledWords
      }
    });
  }, [filledWords, fillData, setResultData]);

  const blanks = extractBlanks();

  // Calculate input width based on text length
  const getInputWidth = (text: string, minWidth: number = 80) => {
    const charWidth = 10; // Approximate pixels per character
    const padding = 20; // Extra padding for input box
    const textLength = text ? text.length : 5; // Default to 5 chars if empty
    return Math.max(minWidth, textLength * charWidth + padding);
  };

  // Check if a filled word is correct for a specific blank
  function isAnswerCorrect(blankIndex: number, filledWord: string): boolean {
    const blanks = extractBlanks();
    if (blankIndex >= blanks.length) return false;
    
    const expectedWord = blanks[blankIndex].word;
    return filledWord.toLowerCase() === expectedWord.toLowerCase();
  }

  // Get input styling based on result indicator state
  function getInputStyling(blankIndex: number, filledWord: string): string {
    if (!filledWord) {
      return 'bg-white border-gray-300 text-gray-800';
    }
    
    if (resultIndicator) {
      // Show red border for wrong answers when result indicator is active
      const isCorrect = isAnswerCorrect(blankIndex, filledWord);
      return isCorrect 
        ? 'border-green-500 bg-green-50 text-green-800' 
        : 'border-red-500 bg-red-50 text-red-800';
    }
    
    // Normal state - blue border for filled inputs
    return 'border-blue-300';
  }

  return (
    <section className="mb-6 bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Fill in the Missing Words</h2>
      
      {/* Paragraph Display with Input Boxes */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-70">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Paragraph</h3>
        <div className="text-gray-800 leading-10 text-lg whitespace-pre-wrap">
          {blanks.length > 0 ? (
            <div>
              {blanks.map((blank, index) => {
                const beforeBlank = fillData.paragraph.slice(
                  index === 0 ? 0 : blanks[index - 1].endIndex,
                  blank.startIndex
                );
                const filledWord = filledWords[index] || "";
                
                return (
                  <span key={index}>
                    {beforeBlank}
                    <input
                      type="text"
                      aria-label={`Blank ${index + 1} for word ${blank.word}`}
                      className={`inline-block px-1 mx-1 h-8 rounded border-2 text-center font-medium focus:outline-none ${
                        getInputStyling(index, filledWord)
                      }`}
                      style={{ width: `${getInputWidth(filledWord)}px` }}
                      value={filledWord}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                    {index === blanks.length - 1 && 
                      fillData.paragraph.slice(blank.endIndex)
                    }
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="text-gray-500 italic">No fill-in-the-blank words found in this paragraph.</span>
          )}
        </div>
      </div>

      {/* Available Words */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Available Words</h3>
        <div className="flex flex-wrap gap-2">
          {fillData.options.map((option, index) => {
            const isUsed = usedOptionIndices.has(index);
            
            return (
              <div
                key={index}
                className={`px-4 py-2 rounded-lg border font-medium transition-all duration-300 ${
                  isUsed
                    ? 'bg-gray-100 text-gray-500 border-gray-300 line-through'
                    : 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200'
                }`}
                title={isUsed ? "This word is already used" : "Available for use"}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
