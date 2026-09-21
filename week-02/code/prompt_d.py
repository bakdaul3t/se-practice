def analyze_marks(marks, pass_mark=50):
    """
    Analyze a collection of student marks.

    Returns:
        dict: A dictionary containing:
            - average: Average mark
            - highest: Highest mark
            - lowest: Lowest mark
            - pass_rate: Percentage of marks >= pass_mark

    Raises:
        ValueError: If marks is empty, contains invalid values,
                    contains out-of-range marks, or pass_mark is invalid.
    """

    # Validate that marks is not empty.
    if not marks:
        raise ValueError("marks cannot be empty")

    # Validate pass_mark.
    # bool is explicitly rejected because bool is a subclass of int in Python.
    if isinstance(pass_mark, bool) or not isinstance(pass_mark, (int, float)):
        raise ValueError("pass_mark must be a number")

    if not 0 <= pass_mark <= 100:
        raise ValueError("pass_mark must be between 0 and 100")

    # Validate every mark.
    for mark in marks:
        # Accept integers and floats, but reject booleans.
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError("all marks must be numeric")

        # Marks must be within the inclusive range [0, 100].
        if not 0 <= mark <= 100:
            raise ValueError("marks must be between 0 and 100")

    # Calculate statistics.
    average = sum(marks) / len(marks)
    highest = max(marks)
    lowest = min(marks)

    # A mark passes when it is greater than or equal to pass_mark.
    passed_count = sum(mark >= pass_mark for mark in marks)
    pass_rate = (passed_count / len(marks)) * 100

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate
    }