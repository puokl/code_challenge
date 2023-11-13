import unittest
import sys
import os


# Add the directory containing solution.py to the Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)


print("Current Directory:", current_dir)
print("Updated sys.path:", sys.path)

from solution import alphabetical_order

class TestAlphabeticalOrder(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(alphabetical_order("webmaster"), "abeemrstw")

    def test_case_insensitivity(self):
        self.assertEqual(alphabetical_order("Software"), "aeforst")

    def test_ignore_non_letters(self):
        self.assertEqual(alphabetical_order("Python 3.9!"), "hnopty")

if __name__ == '__main__':
    unittest.main(verbosity=2)
