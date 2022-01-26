import unittest
from action import GithubAction

class TestGithubAction(unittest.TestCase):
    def test_get_output_file_paths(self):
        gh_action = GithubAction()
        gh_action.file_paths = '["./*"]'
        gh_action.get_output_file_paths()
        self.assertEqual(gh_action.file_paths,
            "./CODE_OF_CONDUCT.md ./README.md ./CONTRIBUTING.md"
        )
        
    def test_get_categories(self):
        gh_action = GithubAction()
        gh_action.categories = '[code-block,json-to-html-table,workflow-artifact-table]'
        gh_action.get_categories()
        self.assertEqual(gh_action.categories,
            "code-block json-to-html-table workflow-artifact-table"
        )