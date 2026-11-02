
def can_book(start, end, now, blocked, existing):
    if start < 0 or end > 1440:
        return False

    if start >= end:
        return False

    if start < now:
        return False

    if end - start > 120:
        return False

    if blocked:
        return False

    for booking_start, booking_end in existing:
        if start <= booking_end and end >= booking_start:
            return False

    return True
