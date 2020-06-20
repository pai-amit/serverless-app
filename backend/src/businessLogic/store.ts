import Attachment from '../dataLayer/store'

const attachment = new Attachment()

export async function getAttachmentUrl(todoId: string): Promise<string> {
    return await attachment.getAttachmentUrl(todoId)
}

export function getSignedUrl(todoId: string): string | null {
    return attachment.getSignedUrl(todoId)
}