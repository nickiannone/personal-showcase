export default function stripTimestamps(model) {
    const { published_at, created_at, updated_at, ...stripped } = model;
    return stripped;
}