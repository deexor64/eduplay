import React, { useEffect, useState } from "react";

type Teacher = {
  id: string;
  name: string;
  subject: string;
  avatar: string;
};

type Message = {
  id: string;
  from: "parent" | "teacher";
  text: string;
  timestamp: string;
};

function ContactSchool() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(function () {
    const dummyTeachers: Teacher[] = [
      { id: "t1", name: "Mr. Ahmed", subject: "Math", avatar: "/avatars/avatar8.png" },
      { id: "t2", name: "Ms. Lily", subject: "English", avatar: "/avatars/avatar9.png" },
      { id: "t3", name: "Mrs. Kamau", subject: "Science", avatar: "/avatars/avatar10.png" },
    ];
    setTeachers(dummyTeachers);
    setSelectedTeacherId(dummyTeachers[0].id);

    const dummyMessages: Message[] = [
      {
        id: "m1",
        from: "teacher",
        text: "Hello! Just letting you know Aaliyah did very well in the last math quiz.",
        timestamp: "2025-04-30 10:12",
      },
      {
        id: "m2",
        from: "parent",
        text: "Thank you, Mr. Ahmed! I’m really proud of her progress.",
        timestamp: "2025-04-30 10:15",
      },
    ];
    setMessages(dummyMessages);
  }, []);

  function handleSendMessage() {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: Date.now().toString(),
      from: "parent",
      text: newMessage.trim(),
      timestamp: new Date().toLocaleString(),
    };

    setMessages(function (prev) {
      return [...prev, newMsg];
    });
    setNewMessage("");
  }

  const selectedTeacher = teachers.find(function (t) {
    return t.id === selectedTeacherId;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6">

        <div className="text-2xl font-bold text-blue-900 mb-6">Contact School</div>

        {/* Select Teacher */}
        <div className="mb-6">
          <label className="block mb-2 text-blue-700 font-medium">Select Teacher</label>
          <div className="flex space-x-4">
            {teachers.map(function (teacher) {
              return (
                <button
                  key={teacher.id}
                  onClick={function () { setSelectedTeacherId(teacher.id); }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${selectedTeacherId === teacher.id
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300"
                    }`}
                >
                  <img src={teacher.avatar} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="text-blue-900 font-medium">{teacher.name}</div>
                    <div className="text-sm text-blue-600">{teacher.subject}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Messaging Area */}
        {selectedTeacher && (
          <div>
            <div className="text-lg font-semibold text-blue-800 mb-2">
              Conversation with {selectedTeacher.name}
            </div>
            <div className="h-64 overflow-y-auto border border-blue-200 rounded-lg p-4 bg-blue-50 space-y-4 mb-4">
              {messages.map(function (msg) {
                return (
                  <div
                    key={msg.id}
                    className={`max-w-xs p-3 rounded-lg ${msg.from === "parent"
                      ? "ml-auto bg-blue-200 text-right"
                      : "bg-white"
                      }`}
                  >
                    <div className="text-sm text-blue-900">{msg.text}</div>
                    <div className="text-xs text-blue-600 mt-1">{msg.timestamp}</div>
                  </div>
                );
              })}
            </div>

            {/* New Message Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow border rounded-lg px-4 py-2"
                value={newMessage}
                onChange={function (e) { setNewMessage(e.target.value); }}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactSchool;
