document.addEventListener('DOMContentLoaded', function () {
    var output = document.getElementById('output');
    var input = document.getElementById('command-input');
    var terminalBody = document.getElementById('terminal-body');
    var cmdHistory = [];
    var historyIndex = -1;
    var booted = false;

    // ── Content ──

    var sections = {
        about: [
            '<span class="bold">AllScale Lab</span>',
            '<span class="dim">The experimentation arm of AllScale</span>',
            '',
            'We use stablecoin infrastructure to build things that create',
            '<span class="highlight">positive externalities</span> for the world.',
            '',
            'Stablecoin rails can do more than move money. AllScale Lab',
            'explores how stable, programmable digital currencies can solve',
            'real-world problems -- from financial inclusion and transparent',
            'aid distribution to sustainable commerce and public goods funding.',
            '',
            'We prototype. We measure impact. We open-source everything.',
        ],

        mission: [
            '<span class="bold">Mission</span>',
            '',
            'Most fintech optimizes for extraction.',
            'We optimize for <span class="highlight">externality</span>.',
            '',
            'AllScale Lab exists to prove that stablecoin infrastructure',
            'can generate measurable positive impact at scale -- and that',
            'doing so is not charity, but good engineering.',
            '',
            '<span class="muted">Build things that make the world net-better.</span>',
            '<span class="muted">Measure it. Open-source it. Repeat.</span>',
        ],

        experiments: [
            '<span class="bold">Experiments</span>',
            '',
            '  <span class="success">[ACTIVE]</span>  <span class="bold">x402 Charity</span>',
            '            Open-source middleware that embeds automatic',
            '            micro-donations into any payment flow, powered',
            '            by the x402 protocol.',
            '',
            '            If payments can be programmable, so can giving.',
            '',
            '            Every trade, subscription, or API call can trigger',
            '            a small stablecoin donation to a verified charity --',
            '            in the background, with zero extra steps for the user.',
            '',
            '  <span class="dim">repo:</span>     <span class="accent">github.com/allscale-io/x402charity</span>',
            '  <span class="dim">npm:</span>      <span class="accent">x402charity</span>',
            '  <span class="dim">chain:</span>    Base (USDC)',
            '  <span class="dim">license:</span>  MIT',
            '',
            '<span class="dim">  Type</span> <span class="highlight">x402</span> <span class="dim">for technical details, or</span> <span class="highlight">run x402</span> <span class="dim">to simulate.</span>',
        ],

        x402: [
            '<span class="bold">x402 Charity</span> <span class="dim">-- Technical Overview</span>',
            '',
            '<span class="accent">What is it?</span>',
            '',
            '  An open-source middleware that lets any project trigger a',
            '  small charitable donation whenever a user takes an action --',
            '  a trade, a subscription, an API call, anything.',
            '',
            '  The donation happens in the background. No extra steps for',
            '  the user. No separate donation UI. It\'s just part of the',
            '  payment.',
            '',
            '<span class="accent">Why x402?</span>',
            '',
            '  The x402 protocol makes machine-to-machine stablecoin',
            '  payments native to HTTP. x402 Charity extends that idea:',
            '  if payments can be programmable, so can giving.',
            '',
            '<span class="accent">How it works:</span>',
            '',
            '  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐',
            '  │ User action │ -> │   Your app   │ -> │ x402 Charity │',
            '  └─────────────┘    └──────┬───────┘    │  middleware   │',
            '                            │            └──────┬───────┘',
            '                            v                   v',
            '                     Normal payment      Donation sent',
            '                      continues          via x402',
            '',
            '<span class="accent">Quick start:</span>',
            '',
            '  <span class="dim">$</span> <span class="highlight">npm install x402charity</span>',
            '',
            '  <span class="muted">const { x402Charity } = require(\'x402charity\');</span>',
            '',
            '  <span class="muted">const charity = x402Charity({</span>',
            '  <span class="muted">  cause: \'red-cross\',</span>',
            '  <span class="muted">  amount: \'0.0001\',      // USDC per event</span>',
            '  <span class="muted">  currency: \'USDC\',</span>',
            '  <span class="muted">});</span>',
            '',
            '  <span class="muted">app.post(\'/trade\', charity.wrap(async (req, res) => {</span>',
            '  <span class="muted">  // your trade logic here</span>',
            '  <span class="muted">}));</span>',
            '',
            '<span class="accent">Example use cases:</span>',
            '',
            '  <span class="highlight">></span> DEX or prediction market -- donate $0.0001 per order',
            '  <span class="highlight">></span> AI SaaS -- donate on every plan purchase or API call',
            '  <span class="highlight">></span> Any x402-enabled app -- attach a cause to any event',
            '',
            '<span class="accent">Configuration:</span>',
            '',
            '  ┌────────────┬──────────────────────────────┬──────────┐',
            '  │ <span class="bold">Option</span>     │ <span class="bold">Description</span>                    │ <span class="bold">Default</span>  │',
            '  ├────────────┼──────────────────────────────┼──────────┤',
            '  │ cause      │ Charity ID or wallet address  │ --       │',
            '  │ amount     │ Donation amount per event     │ 0.0001   │',
            '  │ currency   │ Stablecoin to use             │ USDC     │',
            '  │ network    │ Chain to send on              │ base     │',
            '  │ silent     │ Suppress donation errors      │ true     │',
            '  └────────────┴──────────────────────────────┴──────────┘',
            '',
            '<span class="accent">Architecture:</span>',
            '',
            '  <span class="highlight">packages/</span>',
            '  ├── <span class="accent">core/</span>       Framework-agnostic donation client',
            '  ├── <span class="accent">express/</span>    Express middleware',
            '  ├── <span class="accent">next/</span>       Next.js middleware',
            '  └── <span class="accent">cli/</span>        CLI tool (npx x402charity donate)',
            '',
            '  <span class="highlight">registry/</span>',
            '  └── charities.json   Open directory of verified charities',
        ],

        focus: [
            '<span class="bold">Focus Areas</span>',
            '',
            '  <span class="highlight">01</span>  <span class="bold">Financial Inclusion</span>',
            '      Reducing barriers to cross-border economic participation',
            '      for underserved populations. Banking the unbanked through',
            '      stablecoin wallets and local on-ramps.',
            '',
            '  <span class="highlight">02</span>  <span class="bold">Transparent Public Goods</span>',
            '      On-chain mechanisms for funding and verifying public',
            '      goods delivery. Every transaction auditable. Every',
            '      outcome measurable.',
            '',
            '  <span class="highlight">03</span>  <span class="bold">Sustainable Commerce</span>',
            '      Stablecoin-powered incentive structures that reward',
            '      positive environmental and social outcomes. Aligning',
            '      profit with planet.',
            '',
            '  <span class="highlight">04</span>  <span class="bold">Programmable Impact</span>',
            '      Smart contract systems that automate and enforce',
            '      impact-aligned financial flows. Code as accountability.',
        ],

        approach: [
            '<span class="bold">How We Work</span>',
            '',
            '  ┌─────────────────────────────────────────────────┐',
            '  │                                                 │',
            '  │   <span class="highlight">Identify</span>  ──>  <span class="accent">Prototype</span>  ──>  <span class="warn">Measure</span>        │',
            '  │      │                            │             │',
            '  │      │         <span class="success">Open Source</span>  <──────┘             │',
            '  │      │              │                            │',
            '  │      └──────── <span class="muted">Iterate</span>  <──┘                     │',
            '  │                                                 │',
            '  └─────────────────────────────────────────────────┘',
            '',
            '  <span class="highlight">Experiment</span>   Prototype novel stablecoin applications',
            '  <span class="highlight">Measure</span>      Quantify externalities with real data',
            '  <span class="highlight">Open Source</span>   Share tools, findings, and frameworks',
            '  <span class="highlight">Collaborate</span>  Partner with researchers, NGOs, builders',
        ],

        stack: [
            '<span class="bold">Infrastructure</span>',
            '<span class="dim">Built on AllScale\'s production-grade platform</span>',
            '',
            '  <span class="highlight">┌──────────────────────┐</span>',
            '  <span class="highlight">│</span>  x402 Charity        <span class="highlight">│</span>  Micro-donation middleware',
            '  <span class="highlight">├──────────────────────┤</span>',
            '  <span class="highlight">│</span>  x402 Protocol       <span class="highlight">│</span>  HTTP-native stablecoin payments',
            '  <span class="highlight">├──────────────────────┤</span>',
            '  <span class="highlight">│</span>  Charity Registry    <span class="highlight">│</span>  Verified nonprofit endpoints',
            '  <span class="highlight">├──────────────────────┤</span>',
            '  <span class="highlight">│</span>  USDC on Base        <span class="highlight">│</span>  Gas-free stablecoin rails',
            '  <span class="highlight">├──────────────────────┤</span>',
            '  <span class="highlight">│</span>  AllScale Core       <span class="highlight">│</span>  Production SaaS platform',
            '  <span class="highlight">└──────────────────────┘</span>',
        ],

        allscale: [
            '<span class="bold">About AllScale</span>',
            '',
            'AllScale is a next-generation SaaS platform that removes',
            'friction from cross-border finance using stablecoins.',
            '',
            'It integrates payroll, invoicing, social-commerce, and',
            'treasury management into one platform -- making stablecoin',
            'adoption intuitive for small and medium-sized businesses.',
            '',
            '<span class="dim">Near-instant settlement. Minimal fees. Robust compliance.</span>',
            '',
            'AllScale Lab operates as AllScale\'s dedicated research and',
            'experimentation division, pushing the boundaries of what',
            'stablecoin infrastructure can achieve for the <span class="highlight">public good</span>.',
        ],

        team: [
            '<span class="bold">The Lab</span>',
            '',
            'AllScale Lab is a small, focused team of engineers and',
            'researchers embedded within AllScale. We have direct access',
            'to production stablecoin infrastructure and the freedom to',
            'use it for experiments that may never generate revenue --',
            'but will always generate <span class="highlight">impact</span>.',
            '',
            '<span class="dim">We\'re looking for collaborators.</span>',
            '<span class="dim">Researchers, NGOs, builders -- if you share our vision,</span>',
            '<span class="dim">run</span> <span class="highlight">contact</span> <span class="dim">to get in touch.</span>',
        ],

        philosophy: [
            '<span class="bold">Philosophy</span>',
            '',
            '  <span class="highlight">"</span> The best technology creates value that extends',
            '    beyond its users. A bridge doesn\'t just serve those',
            '    who cross it -- it reshapes the geography of',
            '    possibility for an entire region.',
            '',
            '    Stablecoin infrastructure is a bridge.',
            '    We\'re building the roads on the other side. <span class="highlight">"</span>',
            '',
            '<span class="dim">  Principles:</span>',
            '',
            '  <span class="success">></span> Impact must be measurable, not assumed',
            '  <span class="success">></span> Open source by default, proprietary by exception',
            '  <span class="success">></span> Ship fast, measure honestly, iterate or kill',
            '  <span class="success">></span> Positive-sum thinking over zero-sum competition',
            '  <span class="success">></span> The hardest problems are the most worth solving',
        ],
    };

    var availableCommands = [
        'help', 'about', 'mission', 'experiments', 'x402', 'focus',
        'approach', 'stack', 'allscale', 'team', 'philosophy',
        'ls', 'cat', 'clear', 'neofetch', 'whoami', 'date',
        'history', 'echo', 'sudo', 'contact', 'banner',
        'pwd', 'man', 'exit', 'quit', 'ping', 'status',
        'tree', 'grep', 'run'
    ];

    // ── Helpers ──

    function append(html) {
        output.innerHTML += html;
        scrollToBottom();
    }

    function scrollToBottom() {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function printLines(lines) {
        append(lines.map(function (l) {
            return '<div class="response">' + l + '</div>';
        }).join(''));
    }

    function printCmd(cmd) {
        append(
            '<div class="command-line"><span class="prompt">visitor@lab:~$ </span><span class="cmd">' +
            esc(cmd) + '</span></div>'
        );
    }

    function esc(text) {
        var d = document.createElement('div');
        d.textContent = text;
        return d.innerHTML;
    }

    // ── Command router ──

    function runCommand(raw) {
        var trimmed = raw.trim();
        if (!trimmed) return;

        cmdHistory.push(trimmed);
        historyIndex = cmdHistory.length;
        printCmd(trimmed);

        var parts = trimmed.split(/\s+/);
        var cmd = parts[0].toLowerCase();
        var args = parts.slice(1);

        if (sections[cmd]) {
            printLines(sections[cmd]);
            return;
        }

        switch (cmd) {
            case 'help':     showHelp(); break;
            case 'ls':       showLs(); break;
            case 'cat':      handleCat(args); break;
            case 'tree':     showTree(); break;
            case 'clear':    output.innerHTML = ''; break;
            case 'neofetch': showNeofetch(); break;
            case 'banner':   showBanner(); break;
            case 'contact':  showContact(); break;
            case 'status':   showStatus(); break;
            case 'ping':     handlePing(args); break;
            case 'run':      handleRun(args); break;
            case 'grep':     handleGrep(args); break;
            case 'whoami':
                printLines(['<span class="highlight">visitor</span> <span class="dim">-- Welcome to the Lab.</span>']);
                break;
            case 'pwd':
                printLines(['/home/visitor/allscale-lab']);
                break;
            case 'date':
                printLines([new Date().toString()]);
                break;
            case 'history':
                showHistory();
                break;
            case 'echo':
                printLines([esc(args.join(' '))]);
                break;
            case 'man':
                if (args[0] && sections[args[0]]) {
                    printLines(sections[args[0]]);
                } else {
                    printLines([
                        '<span class="dim">Usage: man &lt;topic&gt;</span>',
                        'Topics: ' + Object.keys(sections).join(', ')
                    ]);
                }
                break;
            case 'sudo':
                printLines([
                    '<span class="error">Permission denied.</span>',
                    '<span class="dim">Lab experiments require peer review, not root access.</span>'
                ]);
                break;
            case 'rm':
                printLines(['<span class="error">rm: cannot remove \'impact\': Operation not permitted</span>']);
                break;
            case 'cd':
                printLines(['<span class="dim">You\'re already in the lab. Start exploring.</span>']);
                break;
            case 'vim':
            case 'nano':
            case 'emacs':
                printLines(['<span class="dim">This terminal is read-only. But we appreciate the instinct.</span>']);
                break;
            case 'exit':
            case 'quit':
                printLines([
                    '<span class="dim">Closing session...</span>',
                    '',
                    '<span class="highlight">Thanks for visiting AllScale Lab.</span>',
                    '<span class="dim">Go build something that matters.</span>'
                ]);
                setTimeout(function () {
                    input.disabled = true;
                    input.placeholder = 'Session ended. Refresh to reconnect.';
                }, 600);
                break;
            default:
                printLines([
                    '<span class="error">command not found: ' + esc(cmd) + '</span>',
                    '<span class="dim">Type</span> <span class="highlight">help</span> <span class="dim">to see available commands.</span>'
                ]);
        }
        scrollToBottom();
    }

    // ── Command implementations ──

    function showHelp() {
        printLines([
            '<span class="bold">Available Commands</span>',
            '',
            '  <span class="highlight">about</span>          What is AllScale Lab?',
            '  <span class="highlight">mission</span>        Our mission and why we exist',
            '  <span class="highlight">experiments</span>    Current experiment: x402 Charity',
            '  <span class="highlight">x402</span>           x402 Charity technical deep-dive',
            '  <span class="highlight">focus</span>          Research focus areas',
            '  <span class="highlight">approach</span>       How we work',
            '  <span class="highlight">stack</span>          Technical infrastructure',
            '  <span class="highlight">philosophy</span>     Our principles and beliefs',
            '  <span class="highlight">team</span>           The people behind the lab',
            '  <span class="highlight">allscale</span>       About AllScale (parent company)',
            '  <span class="highlight">contact</span>        Get in touch',
            '',
            '  <span class="accent">ls</span>             List available files',
            '  <span class="accent">cat &lt;topic&gt;</span>    Read a specific file',
            '  <span class="accent">tree</span>           Show file tree',
            '  <span class="accent">grep &lt;term&gt;</span>    Search across all topics',
            '  <span class="accent">status</span>         Lab system status',
            '  <span class="accent">neofetch</span>       System info',
            '  <span class="accent">run x402</span>       Run x402 Charity simulation',
            '  <span class="accent">ping</span>           Connectivity check',
            '  <span class="accent">banner</span>         Show the welcome banner',
            '  <span class="accent">clear</span>          Clear the terminal',
            '  <span class="accent">history</span>        Command history',
            '',
            '<span class="dim">  Tab to autocomplete | Up/Down for history | Ctrl+L to clear</span>',
        ]);
    }

    function showLs() {
        printLines([
            '<span class="dim">drwxr-xr-x  lab  research</span>  <span class="accent">./experiments/</span>',
            '<span class="dim">-rw-r--r--  lab  research</span>  about.txt',
            '<span class="dim">-rw-r--r--  lab  research</span>  mission.txt',
            '<span class="dim">-rw-r--r--  lab  research</span>  experiments.txt',
            '<span class="dim">-rw-r--r--  lab  research</span>  x402.txt',
            '<span class="dim">-rw-r--r--  lab  research</span>  focus.txt',
            '<span class="dim">-rw-r--r--  lab  research</span>  approach.txt',
            '<span class="dim">-rw-r--r--  lab  research</span>  stack.txt',
            '<span class="dim">-rw-r--r--  lab  research</span>  philosophy.txt',
            '<span class="dim">-rw-r--r--  lab  research</span>  team.txt',
            '<span class="dim">-rw-r--r--  lab  research</span>  allscale.txt',
            '',
            '<span class="dim">10 files | Use</span> cat &lt;name&gt; <span class="dim">to read</span>',
        ]);
    }

    function showTree() {
        printLines([
            '<span class="highlight">allscale-lab/</span>',
            '├── <span class="accent">about.txt</span>',
            '├── <span class="accent">mission.txt</span>',
            '├── <span class="accent">experiments.txt</span>',
            '├── <span class="accent">x402.txt</span>',
            '├── <span class="accent">focus.txt</span>',
            '├── <span class="accent">approach.txt</span>',
            '├── <span class="accent">stack.txt</span>',
            '├── <span class="accent">philosophy.txt</span>',
            '├── <span class="accent">team.txt</span>',
            '├── <span class="accent">allscale.txt</span>',
            '└── <span class="highlight">experiments/</span>',
            '    └── <span class="success">x402-charity/</span>',
            '        ├── packages/',
            '        │   ├── core/',
            '        │   ├── express/',
            '        │   ├── next/',
            '        │   └── cli/',
            '        └── registry/',
            '            └── charities.json',
            '',
            '<span class="dim">10 files, 1 active experiment</span>',
        ]);
    }

    function handleCat(args) {
        if (!args.length) {
            printLines([
                '<span class="dim">Usage: cat &lt;topic&gt;</span>',
                'Available: ' + Object.keys(sections).join(', ')
            ]);
            return;
        }
        var topic = args[0].replace(/\.txt$/, '').toLowerCase();
        if (sections[topic]) {
            printLines(sections[topic]);
        } else {
            printLines(['<span class="error">cat: ' + esc(args[0]) + ': No such file or directory</span>']);
        }
    }

    function handleGrep(args) {
        if (!args.length) {
            printLines(['<span class="dim">Usage: grep &lt;term&gt;</span>']);
            return;
        }
        var term = args.join(' ').toLowerCase();
        var results = [];
        Object.keys(sections).forEach(function (key) {
            sections[key].forEach(function (line) {
                var plain = line.replace(/<[^>]*>/g, '');
                if (plain.toLowerCase().indexOf(term) !== -1) {
                    var highlighted = plain.replace(
                        new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'),
                        '<span class="highlight">$1</span>'
                    );
                    results.push('  <span class="accent">' + key + ':</span> ' + highlighted);
                }
            });
        });
        if (results.length) {
            printLines(['<span class="dim">Found ' + results.length + ' matches:</span>', ''].concat(results));
        } else {
            printLines(['<span class="dim">No matches for "' + esc(term) + '"</span>']);
        }
    }

    function handlePing(args) {
        var target = args[0] || 'allscale-lab';
        printLines(['<span class="dim">PING ' + esc(target) + ' ...</span>']);
        var count = 0;
        var interval = setInterval(function () {
            var ms = (Math.random() * 15 + 5).toFixed(1);
            append('<div class="response"><span class="dim">64 bytes from ' + esc(target) + ':</span> time=<span class="highlight">' + ms + '</span>ms</div>');
            count++;
            if (count >= 4) {
                clearInterval(interval);
                append('<div class="response"><span class="dim">--- ' + esc(target) + ' ping complete ---</span></div>');
                append('<div class="response"><span class="dim">4 packets transmitted, 4 received, 0% loss</span></div>');
            }
        }, 400);
    }

    function handleRun(args) {
        if (!args.length) {
            printLines([
                '<span class="dim">Usage: run &lt;experiment&gt;</span>',
                '',
                'Available experiments:',
                '  <span class="accent">x402</span>      x402 Charity micro-donation simulation',
            ]);
            return;
        }

        var exp = args[0].toLowerCase();

        if (exp !== 'x402' && exp !== 'x402charity' && exp !== 'charity') {
            printLines([
                '<span class="error">Unknown experiment: ' + esc(exp) + '</span>',
                '<span class="dim">Currently running: </span><span class="highlight">x402</span><span class="dim"> (x402 Charity)</span>',
            ]);
            return;
        }

        printLines(['', '<span class="bold">Running: x402 Charity Simulation</span>', '']);

        var steps = [
            'Loading x402 Charity middleware...',
            'Connecting to x402 protocol on Base...',
            'Resolving charity registry (charities.json)...',
            'Registering cause: red-cross',
            'Configuring micro-donation: $0.0001 USDC per event',
            'Simulating 10,000 user actions across 3 apps...',
            'Processing DEX trades... 4,200 donations triggered',
            'Processing SaaS subscriptions... 3,100 donations triggered',
            'Processing AI API calls... 2,700 donations triggered',
            'Settling all donations via x402...',
            'Recording on-chain receipts...',
            'Generating impact report...',
        ];

        var result = [
            '',
            '<span class="bold">Simulation Complete</span>',
            '',
            '  ┌─────────────────────────────────────────────────┐',
            '  │  <span class="bold">x402 Charity -- Impact Report</span>                  │',
            '  ├─────────────────────────────────────────────────┤',
            '  │                                                 │',
            '  │  User actions processed:  <span class="highlight">10,000</span>               │',
            '  │  Donations triggered:     <span class="highlight">10,000</span>               │',
            '  │  Total donated:           <span class="highlight">$1.00 USDC</span>           │',
            '  │  Avg per donation:        <span class="highlight">$0.0001</span>              │',
            '  │  Transaction fees:        <span class="highlight">$0.00</span> <span class="dim">(gas-free)</span>     │',
            '  │  Settlement time:         <span class="highlight">&lt; 2 seconds</span>         │',
            '  │  User friction added:     <span class="success">None</span>                 │',
            '  │                                                 │',
            '  │  <span class="dim">Breakdown by source:</span>                          │',
            '  │    DEX trades:            <span class="accent">4,200</span>  ($0.42)       │',
            '  │    SaaS subscriptions:    <span class="accent">3,100</span>  ($0.31)       │',
            '  │    AI API calls:          <span class="accent">2,700</span>  ($0.27)       │',
            '  │                                                 │',
            '  └─────────────────────────────────────────────────┘',
            '',
            '  <span class="dim">$1 from 10,000 actions. No one noticed. Everyone helped.</span>',
            '  <span class="dim">Now imagine 10 million actions per day.</span>',
        ];

        var i = 0;
        var interval = setInterval(function () {
            if (i < steps.length) {
                var pct = Math.floor(((i + 1) / steps.length) * 20);
                var bar = '='.repeat(pct);
                var space = ' '.repeat(20 - pct);
                var progress = '  <span class="success">[' + bar + space + ']</span>  ';
                append('<div class="response">' + progress + '<span class="dim">' + steps[i] + '</span></div>');
                i++;
            } else {
                clearInterval(interval);
                printLines(result);
            }
        }, 400);
    }

    function showStatus() {
        printLines([
            '<span class="bold">Lab Status</span>',
            '',
            '  <span class="dim">Service</span>              <span class="dim">Status</span>',
            '  ──────────────────────────────────────',
            '  x402 Protocol        <span class="success">operational</span>',
            '  Charity Registry     <span class="success">operational</span>',
            '  USDC on Base         <span class="success">operational</span>',
            '  Middleware (npm)      <span class="success">operational</span>',
            '  AllScale Core        <span class="success">operational</span>',
            '',
            '  <span class="dim">Active experiments:</span>   <span class="highlight">1</span> <span class="dim">(x402 Charity)</span>',
            '  <span class="dim">All systems nominal.</span>  <span class="highlight">Uptime: 99.97%</span>',
        ]);
    }

    function showHistory() {
        if (!cmdHistory.length) {
            printLines(['<span class="dim">No commands in history.</span>']);
            return;
        }
        printLines(cmdHistory.map(function (c, i) {
            return '  <span class="dim">' + String(i + 1).padStart(4) + '</span>  ' + esc(c);
        }));
    }

    function showContact() {
        printLines([
            '<span class="bold">Contact AllScale Lab</span>',
            '',
            '  <span class="highlight">GitHub</span>     github.com/allscale-io',
            '  <span class="highlight">x402</span>       github.com/allscale-io/x402charity',
            '  <span class="highlight">Parent</span>     allscale.io',
            '',
            '  <span class="dim">We\'re looking for collaborators -- researchers, NGOs,</span>',
            '  <span class="dim">engineers, and anyone building for positive impact.</span>',
            '',
            '  <span class="dim">Open an issue. Start a conversation.</span>',
        ]);
    }

    function showNeofetch() {
        printLines([
            '',
            '<span class="ascii-art">      _    _ _ ____            _</span>        <span class="bold">AllScale Lab</span>',
            '<span class="ascii-art">     / \\  | | / ___|  ___ __ _| | ___</span>   <span class="dim">──────────────────────</span>',
            '<span class="ascii-art">    / _ \\ | | \\___ \\ / __/ _` | |/ _ \\</span>  <span class="highlight">Type:</span>       Research Lab',
            '<span class="ascii-art">   / ___ \\| | |___) | (_| (_| | |  __/</span>  <span class="highlight">Parent:</span>     AllScale',
            '<span class="ascii-art">  /_/   \\_\\_|_|____/ \\___\\__,_|_|\\___|</span>  <span class="highlight">Focus:</span>      Stablecoin R&D',
            '<span class="ascii-art">              <span class="accent">L  A  B</span></span>                    <span class="highlight">Mission:</span>    Positive externalities',
            '                                       <span class="highlight">Experiment:</span> x402 Charity',
            '                                       <span class="highlight">Chain:</span>      Base (USDC)',
            '                                       <span class="highlight">Protocol:</span>   x402',
            '                                       <span class="highlight">License:</span>    MIT / Open Source',
            '                                       <span class="highlight">Status:</span>     <span class="success">Online</span>',
            '',
        ]);
    }

    function showBanner() {
        printLines([
            '',
            '<span class="ascii-art">      _    _ _ ____            _</span>',
            '<span class="ascii-art">     / \\  | | / ___|  ___ __ _| | ___</span>',
            '<span class="ascii-art">    / _ \\ | | \\___ \\ / __/ _` | |/ _ \\</span>',
            '<span class="ascii-art">   / ___ \\| | |___) | (_| (_| | |  __/</span>',
            '<span class="ascii-art">  /_/   \\_\\_|_|____/ \\___\\__,_|_|\\___|</span>',
            '<span class="ascii-art">              <span class="accent">L  A  B</span></span>',
            '',
            '<span class="dim">  Stablecoin experiments for positive externalities</span>',
            '',
        ]);
    }

    // ── Boot sequence ──

    function boot() {
        var bootLines = [
            '<span class="dim">[    0.000] AllScale Lab kernel loading...</span>',
            '<span class="dim">[    0.012] Initializing stablecoin runtime...</span>',
            '<span class="dim">[    0.034] Loading experiment: x402 Charity...</span>',
            '<span class="dim">[    0.051] Connecting to x402 protocol... <span class="success">OK</span></span>',
            '<span class="dim">[    0.067] Charity registry loaded... <span class="success">OK</span></span>',
            '<span class="dim">[    0.089] USDC on Base... <span class="success">OK</span></span>',
            '<span class="dim">[    0.102] All systems nominal.</span>',
            '',
        ];

        var bannerLines = [
            '<span class="ascii-art">      _    _ _ ____            _</span>',
            '<span class="ascii-art">     / \\  | | / ___|  ___ __ _| | ___</span>',
            '<span class="ascii-art">    / _ \\ | | \\___ \\ / __/ _` | |/ _ \\</span>',
            '<span class="ascii-art">   / ___ \\| | |___) | (_| (_| | |  __/</span>',
            '<span class="ascii-art">  /_/   \\_\\_|_|____/ \\___\\__,_|_|\\___|</span>',
            '<span class="ascii-art">              <span class="accent">L  A  B</span></span>',
            '',
            '<span class="dim">  Stablecoin experiments for positive externalities</span>',
            '',
            '<span class="separator">  ─────────────────────────────────────────────────</span>',
            '',
            '  Welcome to <span class="bold">AllScale Lab</span>.',
            '',
            '  We\'re currently running one experiment:',
            '  <span class="success">[ACTIVE]</span> <span class="bold">x402 Charity</span> <span class="dim">-- programmable micro-donations</span>',
            '',
            '  <span class="dim">Type</span> <span class="highlight">help</span> <span class="dim">to get started.</span>',
            '  <span class="dim">Type</span> <span class="highlight">x402</span> <span class="dim">for the technical deep-dive.</span>',
            '  <span class="dim">Type</span> <span class="highlight">run x402</span> <span class="dim">to simulate the experiment.</span>',
            '',
        ];

        var allLines = bootLines.concat(bannerLines);
        var delay = 0;

        allLines.forEach(function (line, i) {
            var increment = i < bootLines.length ? 80 : 25;
            setTimeout(function () {
                append('<div class="response boot-line">' + line + '</div>');
            }, delay);
            delay += increment;
        });

        setTimeout(function () {
            booted = true;
            input.focus();
        }, delay + 100);
    }

    // ── Tab completion ──

    function tabComplete(partial) {
        if (!partial) return partial;
        var lower = partial.toLowerCase();
        var matches = availableCommands.filter(function (c) {
            return c.startsWith(lower);
        });
        if (matches.length === 1) return matches[0];
        if (matches.length > 1) {
            printCmd(partial);
            printLines(matches.map(function (m) {
                return '  <span class="accent">' + m + '</span>';
            }));
        }
        return partial;
    }

    // ── Event listeners ──

    input.addEventListener('keydown', function (e) {
        if (!booted) { e.preventDefault(); return; }

        if (e.key === 'Enter') {
            var val = input.value;
            input.value = '';
            runCommand(val);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = cmdHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < cmdHistory.length - 1) {
                historyIndex++;
                input.value = cmdHistory[historyIndex];
            } else {
                historyIndex = cmdHistory.length;
                input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            var parts = input.value.split(/\s+/);
            if (parts.length <= 1) {
                input.value = tabComplete(input.value);
            } else {
                var last = parts[parts.length - 1].replace(/\.txt$/, '').toLowerCase();
                var topicMatches = Object.keys(sections).filter(function (s) {
                    return s.startsWith(last);
                });
                if (topicMatches.length === 1) {
                    parts[parts.length - 1] = topicMatches[0];
                    input.value = parts.join(' ');
                } else if (topicMatches.length > 1) {
                    printCmd(input.value);
                    printLines(topicMatches.map(function (m) {
                        return '  <span class="accent">' + m + '</span>';
                    }));
                }
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            output.innerHTML = '';
        }
    });

    terminalBody.addEventListener('click', function () { input.focus(); });
    document.addEventListener('click', function (e) {
        if (e.target.closest('#terminal')) input.focus();
    });

    // ── Init ──
    boot();
});
