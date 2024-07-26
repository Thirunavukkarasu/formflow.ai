import Home from '@/components/icons/home'
import Workflows from '@/components/icons/workflows'
import Settings from '@/components/icons/settings'

export const menuOptions = [
    { name: 'Dashboard', Component: Home, href: '/dashboard' },
    { name: 'Workflows', Component: Workflows, href: '/workflows' },
    { name: 'Settings', Component: Settings, href: '/settings' }
]

export const clients = [...new Array(10)].map((client, index) => ({
    href: `/${index + 1}.png`,
}))

export const products = []

export const CardTypes = {
    email: { description: "Send and email to a user", type: "action" },
    condition: {
        description: "Boolean operator that creates different conditions lanes.",
        type: "action",
    },
    ai: {
        description:
            "Use the power of AI to summarize, respond, create and much more.",
        type: "action",
    },
    slack: { description: "Send a notification to slack", type: "action" },
    google_drive: {
        description:
            "Connect with Google drive to trigger actions or to create files and folders.",
        type: "trigger",
    },
    notion: { description: "Create entries directly in notion.", type: "action" },
    custom_webhook: {
        description:
            "Connect any app that has an API key and send data to your applicaiton.",
        type: "action",
    },
    discord: {
        description: "Post messages to your discord server",
        type: "action",
    },
    google_calendar: {
        description: "Create a calendar invite.",
        type: "action",
    },
    trigger: {
        description: "An event that starts the workflow.",
        type: "trigger",
    },
    action: {
        description: "An event that happens after the workflow begins",
        type: "action",
    },
    wait: {
        description: "Delay the next action step by using the wait timer.",
        type: "action",
    },
};