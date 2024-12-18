'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Send, Volume2, VolumeX } from 'lucide-react'

export function QuestionAsker() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [asking, setAsking] = useState(false)
    const [error, setError] = useState('')
    const [isSpeaking, setIsSpeaking] = useState(false)
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            stopSpeaking()
            utteranceRef.current = new SpeechSynthesisUtterance(text)
            utteranceRef.current.onstart = () => setIsSpeaking(true)
            utteranceRef.current.onend = () => setIsSpeaking(false)
            speechSynthesis.speak(utteranceRef.current)
        }
    }

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel()
            setIsSpeaking(false)
        }
    }

    const toggleSpeech = () => {
        if (isSpeaking) {
            stopSpeaking()
        } else if (answer) {
            speak(answer)
        }
    }

    const handleAskQuestion = async () => {
        if (!question) return

        setAsking(true)
        setError('')
        setAnswer('')
        stopSpeaking()

        try {
            const response = await fetch('http://localhost:3000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            })

            if (response.ok) {
                const data = await response.json()
                setAnswer(data.answer)
            } else {
                setError('Failed to get an answer. Please try again.')
            }
        } catch (error) {
            console.error('Question error:', error)
            setError('An error occurred while asking the question.')
        } finally {
            setAsking(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <Input
                    type="text"
                    placeholder="Ask a question about the PDF"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="flex-grow"
                />
                <Button onClick={handleAskQuestion} disabled={!question || asking}>
                    {asking ? (
                        "Asking..."
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" /> Ask
                        </>
                    )}
                </Button>
            </div>
            {answer && (
                <Alert>
                    <AlertTitle className="flex items-center justify-between">
                        Answer
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleSpeech}
                            className="ml-2"
                        >
                            {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            <span className="ml-2">{isSpeaking ? 'Stop' : 'Listen'}</span>
                        </Button>
                    </AlertTitle>
                    <AlertDescription className="mt-2 whitespace-pre-wrap">{answer}</AlertDescription>
                </Alert>
            )}
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    )
}

