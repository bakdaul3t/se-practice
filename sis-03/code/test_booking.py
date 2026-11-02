
import unittest
from booking import can_book


class TestBooking(unittest.TestCase):

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
