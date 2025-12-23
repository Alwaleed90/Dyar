import { createClient } from '@/lib/supabase/client';

export interface UploadResult {
    url?: string;
    error?: string;
}

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name (default: 'listings')
 * @param folder - Optional folder path within the bucket
 * @returns Promise with the public URL or error
 */
export async function uploadImage(
    file: File,
    bucket: string = 'listings',
    folder?: string
): Promise<UploadResult> {
    try {
        const supabase = createClient();

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = folder ? `${folder}/${fileName}` : fileName;

        // Upload file
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            return { error: error.message };
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return { url: publicUrl };
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Upload failed' };
    }
}

/**
 * Upload multiple images
 * @param files - Array of files to upload
 * @param bucket - The storage bucket name
 * @param folder - Optional folder path
 * @returns Promise with array of URLs
 */
export async function uploadMultipleImages(
    files: File[],
    bucket: string = 'listings',
    folder?: string
): Promise<{ urls: string[]; errors: string[] }> {
    const results = await Promise.all(
        files.map(file => uploadImage(file, bucket, folder))
    );

    const urls = results
        .filter(result => result.url)
        .map(result => result.url!);

    const errors = results
        .filter(result => result.error)
        .map(result => result.error!);

    return { urls, errors };
}

/**
 * Delete an image from Supabase Storage
 * @param path - The file path in storage
 * @param bucket - The storage bucket name
 * @returns Promise with success status
 */
export async function deleteImage(
    path: string,
    bucket: string = 'listings'
): Promise<{ success: boolean; error?: string }> {
    try {
        const supabase = createClient();

        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Delete failed'
        };
    }
}

/**
 * Validate image file
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5)
 * @returns Validation result
 */
export function validateImageFile(
    file: File,
    maxSizeMB: number = 5
): { valid: boolean; error?: string } {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Invalid file type. Please upload JPEG, PNG, or WebP images.'
        };
    }

    // Check file size
    const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
    if (file.size > maxSize) {
        return {
            valid: false,
            error: `File size must be less than ${maxSizeMB}MB`
        };
    }

    return { valid: true };
}
