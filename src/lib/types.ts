import { z } from 'zod'

export const EditUserProfileSchema = z.object({
    email: z.string().email('Required'),
    name: z.string().min(1, 'Required'),
})

export const WorkflowFormSchema = z.object({
    name: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required'),
})

export type EditorCanvasTypes =
    | 'email'
    | 'condition'
    | 'ai'
    | 'slack'
    | 'google_drive'
    | 'notion'
    | 'custom_webhook'
    | 'google_calendar'
    | 'trigger'
    | 'action'
    | 'wait'

export type EditorCanvasCardType = {
    title: string
    description: string
    completed: boolean
    current: boolean
    metadata: any
    type: EditorCanvasTypes
}

export type EditorNodeType = {
    id: string
    type: EditorCanvasCardType['type']
    position: {
        x: number
        y: number
    }
    data: EditorCanvasCardType
}

export type EditorNode = EditorNodeType

export type EditorActions =
    | {
        type: 'LOAD_DATA'
        payload: {
            elements: EditorNode[]
            edges: {
                id: string
                source: string
                target: string
            }[]
        }
    }
    | {
        type: 'UPDATE_NODE'
        payload: {
            elements: EditorNode[]
        }
    }
    | { type: 'REDO' }
    | { type: 'UNDO' }
    | {
        type: 'SELECTED_ELEMENT'
        payload: {
            element: EditorNode
        }
    }