"use client"
import { QuestionAsker } from "@/components/QuestionAsker"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function ChatPage() {
    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col">
            <header className="flex items-center mb-8">
                <SidebarTrigger className="mr-4" />
                <h1 className="text-4xl font-bold">ChatPDF</h1>
            </header>
            <div className="bg-card rounded-lg p-6 shadow-md">
                <QuestionAsker />
            </div>
        </div>
    )
}

