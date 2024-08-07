
# AI-Assisted Code Review for Azure DevOps

## Elevate Your Code Review Process with AI

Welcome to the **AI-Assisted Code Review DevOps Extension**! Revolutionize your development process by integrating OpenAI’s cutting-edge language models into your Azure DevOps pipeline. Transform your code reviews into a smart, efficient, and insightful process.

### Start Improving Your Code Reviews Today

Supercharge your workflow with AI-powered code reviews. Install the extension now and unlock intelligent, actionable insights for every code change. Embrace the future of code reviews with ease!

## Why Use AI-Assisted Code Review?

- **Automated Code Analysis:** Eliminate manual inspections with AI-driven analysis that detects bugs, performance issues, and suggests best practices automatically.
- **Simple Installation:** Get started quickly with a one-click installation from the [Azure DevOps Marketplace](https://marketplace.visualstudio.com/items?itemName=AidanCole.oaicr).
- **Intelligent Insights:** Harness advanced natural language processing to receive meaningful feedback on your pull requests.
- **Accelerated Review Cycles:** Save time by letting AI handle routine reviews, so your team can focus on what truly matters.
- **Customizable Settings:** Adapt the extension to your needs by configuring the AI model, file exclusions, and additional review prompts.

## Prerequisites

- An [Azure DevOps Account](https://dev.azure.com/)
- An [OpenAI API Key](https://platform.openai.com/docs/overview)

## Getting started

1. Install the AI Assisted Code Review DevOps Extension from the [Azure DevOps Marketplace]([https://marketplace.visualstudio.com/azuredevops](https://marketplace.visualstudio.com/items?itemName=AidanCole.oaicr)).
2. Add AI Assisted Code Review Task to Your Pipeline:

   ```yaml
   trigger:
     branches:
       exclude:
         - '*'

   pr:
     branches:
       include:
         - '*'

   jobs:
   - job: CodeReview
     pool:
       vmImage: 'ubuntu-latest'
     steps:
     - task: OpenAICodeReviewTask@1
       inputs:
         api_key: $(OpenAI_ApiKey)
         ai_model: 'gpt-3.5-turbo'
         bugs: true
         performance: true
         best_practices: true
         file_extensions: 'js,ts,css,html'
         file_excludes: 'file1.js,file2.py,secret.txt'
         additional_prompts: 'Fix variable naming, Ensure consistent indentation, Review error handling approach'`

3. If you do not already have Build Validation configured for your branch already add [Build validation](https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops&tabs=browser#build-validation) to your branch policy to trigger the code review when a Pull Request is created

## FAQ

### Q: What agent job settings are required?

A: Ensure that "Allow scripts to access OAuth token" is enabled as part of the agent job. Follow the [documentation](https://learn.microsoft.com/en-us/azure/devops/pipelines/build/options?view=azure-devops#allow-scripts-to-access-the-oauth-token) for more details.

### Q: What permissions are required for Build Administrators?

A: Build Administrators must be given "Contribute to pull requests" access. Check [this Stack Overflow answer](https://stackoverflow.com/a/57985733) for guidance on setting up permissions.

### Bug Reports

If you find a bug or unexpected behavior, please [open a bug report](https://github.com/jithinanchanattu/AI-Assisted-Code-Review/issues/new?assignees=&labels=bug&template=bug_report.md&title=).

### Feature Requests

If you have ideas for new features or enhancements, please [submit a feature request](https://github.com/jithinanchanattu/AI-Assisted-Code-Review/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=).

## License

This project is licensed under the [MIT License](LICENSE).

If you would like to contribute to the development of this extension, please follow our contribution guidelines.
