from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load AI embedding model only once
model = SentenceTransformer("all-MiniLM-L6-v2")


def get_embedding(text: str):
    return model.encode(text)


def semantic_search(query, notes):

    if len(notes) == 0:
        return []

    note_texts = []

    for note in notes:
        note_texts.append(
            f"{note.title} {note.content} {note.tag}"
        )

    note_embeddings = model.encode(note_texts)

    query_embedding = model.encode([query])

    scores = cosine_similarity(
        query_embedding,
        note_embeddings
    )[0]

    ranked = sorted(
        zip(scores, notes),
        reverse=True,
        key=lambda x: x[0]
    )

    return [note for score, note in ranked]