"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  text: string
  sender: "user" | "mira"
  timestamp: Date
  typing?: boolean
}

export default function MiraChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm MIRA - Your Intelligent Real Estate Agent. 🏠✨\n\nI'm here to help you find your perfect home! To get started, could you please share your name?",
      sender: "mira",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [userInfo, setUserInfo] = useState({ name: "", mobile: "" })
  const [step, setStep] = useState<"name" | "mobile" | "chat">("name")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateTyping = () => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    simulateTyping()

    // Handle different steps
    if (step === "name") {
      setUserInfo((prev) => ({ ...prev, name: inputValue }))
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: `Nice to meet you, ${inputValue}! 😊\n\nNow, could you please share your mobile number so I can assist you better?`,
            sender: "mira",
            timestamp: new Date(),
          },
        ])
      }, 1500)
      setStep("mobile")
    } else if (step === "mobile") {
      setUserInfo((prev) => ({ ...prev, mobile: inputValue }))
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: `Perfect! Thank you ${userInfo.name}. 🎉\n\nI'm here to help you with:\n• Property search & recommendations\n• Site visit scheduling\n• Investment guidance\n• Project information\n\nWhat type of property are you looking for?`,
            sender: "mira",
            timestamp: new Date(),
          },
        ])
      }, 1500)
      setStep("chat")
    } else {
      // Simulate MIRA responses
      setTimeout(() => {
        const responses = [
          `Great choice! 🏡 Based on your interest, I have some excellent ${inputValue.toLowerCase()} options in prime locations. Would you like me to show you our featured projects?`,
          `I'd be happy to help you with that! 📋 Let me gather some information about our current offerings that match your requirements.`,
          `Excellent! 🌟 I can schedule a site visit for you. Our projects feature modern amenities, strategic locations, and great investment potential.`,
          `That sounds perfect! 💫 I can provide you with detailed information about pricing, floor plans, and available units. Would you like me to connect you with our sales team?`,
          `Wonderful! 🎯 Based on your preferences, I recommend checking out our premium developments. They offer excellent value and modern living spaces.`,
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 2).toString(),
            text: randomResponse,
            sender: "mira",
            timestamp: new Date(),
          },
        ])
      }, 1500)
    }

    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const quickReplies = ["2 BHK Apartment", "3 BHK Apartment", "Villa", "Penthouse", "Investment Options", "Site Visit"]

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-2xl transform hover:scale-110 transition-all duration-300 relative"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageCircle className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
            </>
          )}
        </Button>

        {!isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-3 max-w-xs animate-bounce">
            <p className="text-sm text-gray-700">
              👋 Hi! I'm MIRA, your real estate assistant. How can I help you today?
            </p>
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200" />
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card
          className={`fixed bottom-24 right-6 z-50 shadow-2xl border-0 transition-all duration-300 ${
            isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
          }`}
        >
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-white text-amber-600 font-bold">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">MIRA</h3>
                  <p className="text-xs text-amber-100">Real Estate Assistant • Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-amber-700 h-8 w-8 p-0"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-amber-700 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-full">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-end space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          className={message.sender === "user" ? "bg-blue-600 text-white" : "bg-amber-600 text-white"}
                        >
                          {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`p-3 rounded-2xl shadow-sm ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-md"
                            : "bg-white text-gray-900 rounded-bl-md border"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-amber-600 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-white p-3 rounded-2xl rounded-bl-md border shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {step === "chat" && (
                <div className="px-4 py-2 bg-white border-t">
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply) => (
                      <Button
                        key={reply}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setInputValue(reply)
                          handleSendMessage()
                        }}
                        className="text-xs h-7 px-3 bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      step === "name"
                        ? "Enter your name..."
                        : step === "mobile"
                          ? "Enter your mobile number..."
                          : "Type your message..."
                    }
                    className="flex-1 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-amber-600 hover:bg-amber-700 px-3"
                    disabled={isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Contact Options */}
                <div className="flex items-center justify-center space-x-4 mt-3 pt-3 border-t">
                  <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-amber-600">
                    <Phone className="h-3 w-3 mr-1" />
                    Call Us
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-amber-600">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  )
}
