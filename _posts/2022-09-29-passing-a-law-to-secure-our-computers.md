---
title: Passing a Law is the Only Way to Secure our Computers
layout: post
---
[Security legend Bruce Schneier thinks that we need a new law requiring companies to secure their systems](https://www.nytimes.com/2022/09/26/opinion/uber-hack-data.html?unlocked_article_code=NtT_BzEvh7MuHXng1inIHQ0fj4iwUYG4onzEHEyTkq83shOOppRzxWQyQoSbxjKzhz_9l51d4K6YWz7ytEkzG6EYQ4u55Pq6JuTjbk37zb-yKie35EWbDC6M7sXLLfzldOrimY6vEb2vMA5dtbcgF7ZErnz0w3291CWk4tF7pH3hbu45QvNZtNQDXElAdO2LYQ5aJAbCEWsD2qwkFGvga0S7Cv6JNkfiW2SiLlMg3Ahg7KmsrHk9bg1ptYzJ_iRtbSp9I16kCQcqyQdowhtQbs9j6tkkpRGvaxXEvnQDir-aqUr1cxrhkXKAEgcfTRnNnhfyUPmyt1A&smid=share-url):
> We need strong regulations that force organizations to maintain good security practices. The focus must be on resilient security for the user data entrusted to the company. Government regulation should not be involved (for example) if Uber loses the source code to its phone apps or its employee Slack channel. Government regulation should be involved if Uber loses data about the rides taken by its 100 million-plus users.

### Why a Law?
The market does not currently reward companies that spend resources on security. Preventing disaster is not as exciting or likely to grow users and revenue as a new feature for your app.

### My Experience
Security issues are addressed as they happen or if someone brings them up. Otherwise the default options are used on most software applications. Many smaller organizations are rife with poor security practices like sharing passwords for a single account instead of making individual user accounts for each person. 

### Use a Password Manager
The best thing you can do to improve your own security is use a password manager like [1Password](https://1password.com). Many organizations are paying for this for their employees. By using a different password it generates for every login, you limit the damage from a single hack.

### Software Engineers Should Use Security Scanners
Companies like [Semgrep](https://semgrep.dev) offer tools that make scanning for security issues easy and can handle many languages and libraries.

Some free tools to consider:
* [Brakeman](https://brakemanscanner.org/) scans Ruby code for vulnerabilities.
* [bundle-audit](https://github.com/rubysec/bundler-audit) makes it easy to see if your libraries are outdated.
* GitHub has [features to auto-update your code and scan for security issues](https://github.com/features/security). 