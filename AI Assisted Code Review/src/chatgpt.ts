import tl = require('azure-pipelines-task-lib/task');
import { encode } from 'gpt-tokenizer';
import { BedrockClient, ChatCompletionRequest } from '@aws-sdk/client-bedrock';

export class ChatClaude {
    private readonly systemMessage: string = '';

    constructor(
        private _bedrockClient: BedrockClient,
        private modelId: string = 'claude-2',
        checkForBugs: boolean = false,
        checkForPerformance: boolean = false,
        checkForBestPractices: boolean = false,
        additionalPrompts: string[] = []
    ) {
        this.systemMessage = `Your task is to act as a code reviewer of a Pull Request:
        - Use bullet points if you have multiple comments.
        ${checkForBugs ? '- If there are any bugs, highlight them.' : ''}
        ${checkForPerformance ? '- If there are major performance problems, highlight them.' : ''}
        ${checkForBestPractices ? '- Provide details on missed use of best-practices.' : ''}
        ${additionalPrompts.length > 0 ? additionalPrompts.map(str => `- ${str}`).join('\n') : ''}
        - Do not highlight minor issues and nitpicks.
        - Only provide instructions for improvements.
        - If you have no instructions, respond with NO_COMMENT only; otherwise, provide your instructions.

        You are provided with the code changes (diffs) in a unidiff format.

        The response should be in markdown format.`;
    }

    public async PerformCodeReview(diff: string, fileName: string): Promise<string> {
        if (!this.doesMessageExceedTokenLimit(diff + this.systemMessage, 4097)) {
            const request: ChatCompletionRequest = {
                modelId: this.modelId,
                messages: [
                    {
                        role: 'system',
                        content: this.systemMessage
                    },
                    {
                        role: 'user',
                        content: diff
                    }
                ]
            };

            try {
                const response = await this._bedrockClient.sendChatCompletion(request);

                if (response.choices && response.choices.length > 0) {
                    return response.choices[0].message?.content || '';
                }
            } catch (error) {
                tl.warning(`Error processing diff for file ${fileName}: ${error}`);
                return '';
            }
        }

        tl.warning(`Unable to process diff for file ${fileName} as it exceeds token limits.`);
        return '';
    }

    private doesMessageExceedTokenLimit(message: string, tokenLimit: number): boolean {
        const tokens = encode(message);
        return tokens.length > tokenLimit;
    }
}
