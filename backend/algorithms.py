def insertion_sort(notes):
    notes = notes[:]

    for i in range(1, len(notes)):
        current = notes[i]
        j = i - 1

        while j >= 0 and notes[j].title.lower() > current.title.lower():
            notes[j + 1] = notes[j]
            j -= 1

        notes[j + 1] = current

    return notes


def linear_search(notes, keyword):
    keyword = keyword.lower()

    return [
        note for note in notes
        if keyword in note.title.lower()
        or keyword in note.content.lower()
        or keyword in note.tag.lower()
    ]


def binary_search(notes, title):
    title = title.lower()

    left = 0
    right = len(notes) - 1

    while left <= right:

        mid = (left + right) // 2

        current = notes[mid].title.lower()

        if current == title:
            return notes[mid]

        elif current < title:
            left = mid + 1

        else:
            right = mid - 1

    return None


def binary_search_recursive(notes, title, left, right):

    title = title.lower()

    if left > right:
        return None

    mid = (left + right) // 2

    current = notes[mid].title.lower()

    if current == title:
        return notes[mid]

    elif current < title:
        return binary_search_recursive(notes, title, mid + 1, right)

    else:
        return binary_search_recursive(notes, title, left, mid - 1)
    


def quick_find(notes, keyword):
    keyword = keyword.lower()

    return [
        note
        for note in notes
        if keyword in note.title.lower()
    ]