# upper_case_first_letter_test.py

import unittest
import sys
import os


# Add the directory containing solution.py to the Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)


print("Current Directory:", current_dir)
print("Updated sys.path:", sys.path)

from solution import upper_case_first_letter

class TestUpperCaseFirstLetter(unittest.TestCase):

    def test_basic_case(self):
        self.assertEqual(upper_case_first_letter("hello world"), "Hello World")

    def test_multiple_words(self):
        self.assertEqual(upper_case_first_letter("python is fun"), "Python Is Fun")

    def test_leading_trailing_spaces(self):
        self.assertEqual(upper_case_first_letter("  hello world  "), "Hello World")

if __name__ == '__main__':
    unittest.main(verbosity=2)
