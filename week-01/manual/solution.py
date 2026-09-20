def proccess_marks(user_input):
    input_update = [item.strip() for item in user_input.split(',')]

    input_final = []
    for i in input_update:
        try:
            num = float(i)
            if 0 <= num <= 100:
                input_final.append(int(num) if num.is_integer() else num)
        except (ValueError, TypeError):
            continue

    if not input_final:
        print("No valid marks found")
        return

    count = len(input_final)
    average = sum(input_final) / count
    highest = max(input_final)
    lowest = min(input_final)

    passed_count = sum(1 for j in input_final if j >= 50)
    pass_rate = (passed_count / count) * 100

    print(f"Valid: {count}")
    print(f"Average: {average:.2f}")
    print(f"Highest: {highest}")
    print(f"Lowest: {lowest}")
    print(f"Pass rate: {pass_rate:.1f}%")

if __name__ == "__main__":
    user_input = input(">> ")
    proccess_marks(user_input)