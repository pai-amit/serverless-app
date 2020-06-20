import ImageUpload from '../dataLayer/store'

const imageUpload = new ImageUpload()

export async function getImageUrl(todoId: string): Promise<string> {
    return await imageUpload.getImageUrl(todoId)
}

export function getImageSignedUrl(todoId: string): string | null {
    return imageUpload.getImageSignedUrl(todoId)
}
