import unittest
from action import GithubAction

class TestGithubAction(unittest.TestCase):
    def test_get_output_file_paths(self):
        gh_action = GithubAction()
        gh_action.file_paths = '["./*"]'
        gh_action.get_output_file_paths()
        output_file_paths = gh_action.file_paths.split(" ")
        expected_output_file_paths = ["./CODE_OF_CONDUCT.md", 
                                      "./README.md", 
                                      "./CONTRIBUTING.md"]
        self.assertEqual(output_file_paths,
                         expected_output_file_paths)
        
    def test_get_categories(self):
        gh_action = GithubAction()
        gh_action.categories = '[code-block,json-to-html-table,workflow-artifact-table]'
        gh_action.get_categories()
        categories = gh_action.categories.split(" ")
        expected_categories = ["code-block", 
                               "json-to-html-table", 
                               "workflow-artifact-table"]
        self.assertEqual(
            categories,
            expected_categories
        )