"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function SettingsPage() {
    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col">
            <header className="flex items-center mb-8">
                <SidebarTrigger className="mr-4" />
                <h1 className="text-4xl font-bold">Settings</h1>
            </header>
            <div className="bg-card rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Settings</h2>
                <p>Settings options will be added here in the future.</p>
            </div>
        </div>
    )
}

