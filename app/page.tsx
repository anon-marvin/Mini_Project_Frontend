"use client"

import { useState } from "react"
import { PdfUploader } from "@/components/PdfUploader"
import { QuestionAsker } from "@/components/QuestionAsker"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Home() {
  const [pdfUploaded, setPdfUploaded] = useState(false)

  return (
   <div className="container mx-auto p-4 flex flex-col  ">
  <header className="flex items-center mb-8">
    <SidebarTrigger className="mr-4" />
    <h1 className="text-4xl font-bold">ChatPDF</h1>
  </header>
  <div className="space-y-8 flex-grow w-full">
    <section className="bg-card rounded-lg p-6 shadow-md ">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Upload PDF</h2>
      <PdfUploader onUploadSuccess={() => setPdfUploaded(true)} />
    </section>
    {pdfUploaded && (
      <section className="bg-card rounded-lg p-6 shadow-md ">
        <h2 className="text-2xl font-semibold mb-4">Step 2: Ask Questions</h2>
        <QuestionAsker />
      </section>
    )}
  </div>
</div>

  )
}
