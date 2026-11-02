
import unittest
from booking import can_book


class TestBooking(unittest.TestCase):

    def test_existing_booking_order_not_changed(self):
        existing = [(900, 960), (600, 660)]
        before = existing.copy()

        can_book(720, 780, 540, False, existing)

        self.assertEqual(existing, before)

    def test_existing_booking_list_not_extended(self):
        existing = [(600, 660)]
        before = existing.copy()

        result = can_book(720, 780, 540, False, existing)

        self.assertTrue(result)
        self.assertEqual(len(existing), len(before))
        self.assertEqual(existing, before)

    def test_existing_not_modified_when_blocked(self):
        existing = [(600, 660)]
        before = existing.copy()

        can_book(720, 780, 540, True, existing)

        self.assertEqual(existing, before)


    def test_start_at_last_minute(self):
        self.assertTrue(
            can_book(1439, 1440, 540, False, [])
        )

    def test_zero_duration(self):
        self.assertFalse(
            can_book(700, 700, 540, False, [])
        )

    def test_existing_list_unchanged_when_available(self):
        existing = [(600, 660), (900, 960)]
        before = existing.copy()

        result = can_book(720, 780, 540, False, existing)

        self.assertTrue(result)
        self.assertEqual(existing, before)

    def test_existing_list_unchanged_when_unavailable(self):
        existing = [(600, 660), (900, 960)]
        before = existing.copy()

        result = can_book(630, 650, 540, False, existing)

        self.assertFalse(result)
        self.assertEqual(existing, before)

    def test_start_before_zero_with_now_zero(self):
        self.assertFalse(
            can_book(-1, 30, 0, False, [])
        )

    def test_end_before_start(self):
        self.assertFalse(
            can_book(900, 899, 540, False, [])
        )

    def test_start_greater_than_day_limit(self):
        self.assertFalse(
            can_book(1441, 1442, 540, False, [])
        )

    def test_existing_unchanged_on_blocked(self):
        existing = [(600, 660), (900, 960)]
        before = existing.copy()

        result = can_book(720, 780, 540, True, existing)

        self.assertFalse(result)
        self.assertEqual(existing, before)

    def test_existing_unchanged_after_two_calls(self):
        existing = [(600, 660)]
        before = existing.copy()

        first = can_book(660, 720, 540, False, existing)
        second = can_book(660, 720, 540, False, existing)

        self.assertTrue(first)
        self.assertTrue(second)
        self.assertEqual(existing, before)

    def test_start_at_midnight(self):
        self.assertFalse(
            can_book(0, 60, 540, False, [])
        )

    def test_request_contains_booking(self):
        self.assertFalse(
            can_book(600, 720, 540, False, [(630, 660)])
        )

    def test_existing_list_unchanged(self):
        existing = [(600, 660), (900, 960)]
        before = existing.copy()

        can_book(720, 780, 540, False, existing)

        self.assertEqual(existing, before)

    def test_touching_at_end(self):
        self.assertTrue(
            can_book(660, 720, 540, False, [(720, 780)])
        )

    def setUp(self):
        self.now = 540
        self.existing = [(600, 660)]

    def test_T1_touching(self):
        self.assertTrue(
            can_book(660, 720, self.now, False, self.existing)
        )

    def test_T2_overlap(self):
        self.assertFalse(
            can_book(630, 690, self.now, False, self.existing)
        )

    def test_T3_blocked(self):
        self.assertFalse(
            can_book(660, 720, self.now, True, self.existing)
        )

    def test_T4_exactly_120(self):
        self.assertTrue(
            can_book(720, 840, self.now, False, self.existing)
        )

    def test_T5_121_minutes(self):
        self.assertFalse(
            can_book(720, 841, self.now, False, self.existing)
        )

    def test_T6_starts_now(self):
        self.assertFalse(
            can_book(540, 570, self.now, False, self.existing)
        )

    def test_T7_reversed(self):
        self.assertFalse(
            can_book(720, 660, self.now, False, self.existing)
        )

    def test_T8_midnight(self):
        self.assertTrue(
            can_book(1380, 1440, self.now, False, self.existing)
        )

    def test_T9_past_midnight(self):
        self.assertFalse(
            can_book(1380, 1441, self.now, False, self.existing)
        )

    def test_T10_second_booking(self):
        bookings = [(600, 660), (700, 760)]
        self.assertFalse(
            can_book(720, 780, self.now, False, bookings)
        )

    def test_T11_same_check_twice(self):
        first = can_book(660, 720, self.now, False, self.existing)
        second = can_book(660, 720, self.now, False, self.existing)

        self.assertTrue(first)
        self.assertTrue(second)
        self.assertEqual(self.existing, [(600, 660)])

    def test_invalid_start_type(self):
        self.assertFalse(
            can_book(660.5, 720, self.now, False, self.existing)
        )

    def test_negative_start(self):
        self.assertFalse(
            can_book(-10, 60, self.now, False, [])
        )


if __name__ == "__main__":
    unittest.main()
