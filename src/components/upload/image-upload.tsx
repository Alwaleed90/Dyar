'use client'

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadImage, validateImageFile } from '@/lib/upload/images';

interface ImageUploadProps {
    onUploadComplete?: (url: string) => void;
    onUploadError?: (error: string) => void;
    maxFiles?: number;
    folder?: string;
}

export function ImageUpload({
    onUploadComplete,
    onUploadError,
    maxFiles = 5,
    folder
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Validate files
        for (const file of files) {
            const validation = validateImageFile(file);
            if (!validation.valid) {
                onUploadError?.(validation.error!);
                return;
            }
        }

        // Check max files
        if (uploadedUrls.length + files.length > maxFiles) {
            onUploadError?.(`Maximum ${maxFiles} images allowed`);
            return;
        }

        // Create previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviews]);

        // Upload files
        setUploading(true);
        try {
            for (const file of files) {
                const result = await uploadImage(file, 'listings', folder);

                if (result.error) {
                    onUploadError?.(result.error);
                } else if (result.url) {
                    setUploadedUrls(prev => [...prev, result.url!]);
                    onUploadComplete?.(result.url);
                }
            }
        } catch (error) {
            onUploadError?.(error instanceof Error ? error.message : 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        setUploadedUrls(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previewUrls.map((url, index) => (
                    <Card key={index} className="relative aspect-square overflow-hidden">
                        <img
                            src={url}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removeImage(index)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </Card>
                ))}

                {uploadedUrls.length < maxFiles && (
                    <Card
                        className="aspect-square flex items-center justify-center cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="text-center">
                            {uploading ? (
                                <div className="space-y-2">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                                    <p className="text-sm text-muted-foreground">Uploading...</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">Upload Image</p>
                                </div>
                            )}
                        </div>
                    </Card>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                disabled={uploading}
            />

            <p className="text-sm text-muted-foreground">
                {uploadedUrls.length} / {maxFiles} images uploaded
            </p>
        </div>
    );
}
