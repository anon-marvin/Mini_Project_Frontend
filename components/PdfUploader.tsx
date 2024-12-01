import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload } from 'lucide-react'

interface PdfUploaderProps {
    onUploadSuccess: () => void
}

export function PdfUploader({ onUploadSuccess }: PdfUploaderProps) {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('pdf', file)

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                setUploadStatus('success')
                onUploadSuccess()
            } else {
                setUploadStatus('error')
            }
        } catch (error) {
            console.error('Upload error:', error)
            setUploadStatus('error')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-4 ">
            <div className="flex items-center space-x-4">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdf-upload"
                />
                <Button asChild>
                    <label htmlFor="pdf-upload" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                    </label>
                </Button>
                <span className="text-sm text-gray-500">
                    {file ? file.name : "No file chosen"}
                </span>
                <Button onClick={handleUpload} disabled={!file || uploading}>
                    {uploading ? (
                        "Uploading..."
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" /> Upload PDF
                        </>
                    )}
                </Button>
            </div>
            {uploadStatus === 'success' && (
                <Alert>
                    <AlertDescription>PDF uploaded successfully!</AlertDescription>
                </Alert>
            )}
            {uploadStatus === 'error' && (
                <Alert variant="destructive">
                    <AlertDescription>Failed to upload PDF. Please try again.</AlertDescription>
                </Alert>
            )}
        </div>
    )
}

