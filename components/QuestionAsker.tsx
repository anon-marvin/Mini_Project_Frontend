import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Send } from 'lucide-react'

export function QuestionAsker() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [asking, setAsking] = useState(false)
    const [error, setError] = useState('')

    const handleAskQuestion = async () => {
        if (!question) return

        setAsking(true)
        setError('')
        setAnswer('')

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
                    <AlertDescription className="whitespace-pre-wrap">{answer}</AlertDescription>
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

