Vague vs. Precise Prompting — Comparison

Round 1 (Vague Prompt): "Build me a settings form."
The AI made all the decisions — which fields to include, what validation to apply (if any), styling, and structure. The result was usable but generic, requiring guesswork about what "settings" should even contain. No tests were included, and accessibility wasn't addressed unless prompted separately.

Round 2 (Precise Prompt): A detailed prompt specifying exact fields (display name, email, theme, email notifications), the validation library (react-hook-form + zod), validation rules (email format, minimum name length), accessibility requirements (labels with htmlFor), a disabled Save button tied to form validity, and a request for unit tests covering three specific scenarios.

Key differences observed:

The precise prompt produced a component matching an actual specification on the first pass — no back-and-forth needed to clarify intent.
Accessibility (label associations) was only present because it was explicitly requested; the vague prompt didn't include it by default.
Testing was only generated because the prompt asked for it — and even then, initial test failures required debugging (form submission argument mismatch, validation timing on blur) before all 11 tests passed.
The precise prompt took longer to write upfront but required far less follow-up correction than a vague prompt would need to reach the same result.

Takeaway: Precision costs more time before the AI starts working but saves significantly more time in revisions and rework. Vague prompts are faster to type but shift the burden of decision-making — and correctness — onto post-hoc review.git commit -m "docs: add WORKFLOW.md comparing vague vs precise prompting"

**AI mistake caught:** During Round 2, the AI's first version of the test suite expected 
`onSubmit` to be called with only the form data object. The test failed because 
react-hook-form's `handleSubmit` also passes the native submit event as a second argument. 
I caught this from the test failure output and had the AI correct the assertion to match 
the actual call signature.