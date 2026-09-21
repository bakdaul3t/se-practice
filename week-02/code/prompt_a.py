# Student Grade Analyzer

students = {
    "Alice": [85, 92, 78, 90, 88],
    "Bob": [72, 68, 75, 80, 70],
    "Charlie": [95, 90, 93, 97, 96],
    "Diana": [60, 65, 70, 62, 68]
}


def calculate_average(grades):
    return sum(grades) / len(grades)


def get_letter_grade(average):
    if average >= 90:
        return "A"
    elif average >= 80:
        return "B"
    elif average >= 70:
        return "C"
    elif average >= 60:
        return "D"
    else:
        return "F"


# Analyze each student
averages = {}

print("STUDENT GRADE REPORT")
print("-" * 40)

for name, grades in students.items():
    average = calculate_average(grades)
    letter = get_letter_grade(average)
    averages[name] = average

    print(f"{name}:")
    print(f"  Grades: {grades}")
    print(f"  Average: {average:.2f}")
    print(f"  Letter Grade: {letter}")
    print()


# Class statistics
class_average = sum(averages.values()) / len(averages)

highest_student = max(averages, key=averages.get)
lowest_student = min(averages, key=averages.get)

print("-" * 40)
print("CLASS STATISTICS")
print(f"Class Average: {class_average:.2f}")
print(f"Highest Average: {highest_student} ({averages[highest_student]:.2f})")
print(f"Lowest Average: {lowest_student} ({averages[lowest_student]:.2f})")