import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { categories, comparisons, site, tools } from './data.js'
import { premiumStyles } from './styles.js'

const outDir = 'dist'
const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool]))
const routes = []

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const money = (value) =>
  new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }).format(
    value,
  )

const page = ({ content, description = site.description, path, title }) => {
  const canonical = `${site.domain}${path}`
  routes.push(path)
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="stylesheet" href="/styles.css" />
    <meta property="og:site_name" content="${site.name}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${site.gaMeasurementId}');
    </script>
    <title>${escapeHtml(title)}</title>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="/"><span>TS</span>${site.name}</a>
      <nav>
        <a href="/tool-finder/">Finder</a>
        <a href="/tools/">Tools</a>
        <a href="/categories/email-marketing/">Categories</a>
        <a href="/compare/mailerlite-vs-brevo/">Compare</a>
        <a href="/methodology/">Methodology</a>
        <a href="/affiliate-disclosure/">Disclosure</a>
      </nav>
    </header>
    <main>${content}</main>
    <footer class="footer">
      <div>
        <strong>${site.name}</strong>
        <p>Software stack recommendations for freelancers and small businesses.</p>
      </div>
      <nav>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="/methodology/">Methodology</a>
        <a href="/affiliate-disclosure/">Affiliate disclosure</a>
        <a href="/contact/">Contact</a>
      </nav>
    </footer>
  </body>
</html>`
}

const card = (tool) => `<article class="tool-card">
  <div>
    <span>${categoryTitle(tool.category)}</span>
    <h3>${tool.name}</h3>
    <p>${tool.description}</p>
  </div>
  <div class="tool-meta">
    <strong>${tool.price}</strong>
    <small>Best for ${tool.audience.slice(0, 2).join(' and ')}</small>
  </div>
  <ul>${tool.features.map((feature) => `<li>${feature}</li>`).join('')}</ul>
  <div class="card-actions">
    <a href="/tools/${tool.slug}/">Read review</a>
    <a class="secondary-action" href="${tool.url}" rel="sponsored nofollow noopener" target="_blank">Visit website</a>
  </div>
</article>`

const categoryTitle = (slug) =>
  categories.find((category) => category.slug === slug)?.title ?? slug

const hero = (title, description, action = '') => `<section class="hero">
  <div>
    <h1>${title}</h1>
    <p>${description}</p>
    ${action}
  </div>
  <aside class="finder-panel">
    <span>Recommendation model</span>
    <strong>Use case + budget + business type</strong>
    <p>Start with practical fit, then compare pricing, workflow match, and switching cost.</p>
  </aside>
</section>`

const grid = (items) => `<div class="grid">${items.join('')}</div>`

const toolSummary = (tool) =>
  `${tool.name} is a ${categoryTitle(tool.category).toLowerCase()} tool for ${tool.audience.join(', ')} workflows. It is most useful when a small team needs ${tool.features.join(', ')} without building a custom system.`

const bestForLine = (tool) =>
  `${tool.name} is best for ${tool.audience.slice(0, 3).join(', ')} users who want ${tool.features.slice(0, 2).join(' and ')}.`

const categoryAdvice = (category) => {
  const categoryTools = tools.filter((tool) => tool.category === category.slug)
  const freeTools = categoryTools.filter((tool) => tool.budget === 'free')
  return {
    freeTools,
    text:
      freeTools.length > 0
        ? `Start with ${freeTools.map((tool) => tool.name).join(' or ')} if you want a lower-risk test before committing to paid software.`
        : `Start with the tool that matches your workflow most closely, then confirm pricing and limits on the provider website.`,
    tools: categoryTools,
  }
}

const writePage = async (path, html) => {
  const file = path === '/' ? 'index.html' : `${path.replace(/^\/|\/$/g, '')}/index.html`
  const target = join(outDir, file)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, html)
}

const homePage = () =>
  page({
    path: '/',
    title: 'ToolStackFinder - Find Your Small Business Software Stack',
    description:
      'Find practical SaaS tools for email marketing, CRM, accounting, SEO, scheduling, forms, automation, and payments.',
    content: `${hero(
      'Find the right software stack for your business.',
      'Compare SaaS tools by use case, budget, and business type. Start with a guided finder, then review category pages and side-by-side comparisons.',
      '<div class="hero-actions"><a class="primary" href="/tool-finder/">Open tool finder</a><a class="secondary" href="/tools/">Browse tools</a></div>',
    )}
    <section class="section">
      <div class="section-heading">
        <h2>How recommendations work</h2>
        <a href="/methodology/">Read methodology</a>
      </div>
      ${grid([
        '<article class="category-card"><h3>Use-case fit first</h3><p>Recommendations start with business type, workflow, budget, and category match instead of only commission potential.</p></article>',
        '<article class="category-card"><h3>Transparent affiliate model</h3><p>Outbound software links may become affiliate links, but pages should stay useful even before affiliate approval.</p></article>',
        '<article class="category-card"><h3>Review before buying</h3><p>Pricing and features change often, so users should verify details on the provider website before purchasing.</p></article>',
      ])}
    </section>
    <section class="section">
      <h2>Browse by category</h2>
      ${grid(
        categories.map(
          (category) => `<a class="category-card" href="/categories/${category.slug}/">
            <h3>${category.title}</h3>
            <p>${category.description}</p>
          </a>`,
        ),
      )}
    </section>
    <section class="section">
      <h2>Popular comparisons</h2>
      ${grid(
        comparisons.map(
          (comparison) => `<a class="category-card" href="/compare/${comparison.slug}/">
            <h3>${comparison.title}</h3>
            <p>Compare fit, strengths, and use cases before choosing.</p>
          </a>`,
        ),
      )}
    </section>`,
  })

const toolsPage = () =>
  page({
    path: '/tools/',
    title: 'All SaaS Tools - ToolStackFinder',
    description: 'Browse the ToolStackFinder software database by category and use case.',
    content: `${hero('All SaaS tools', 'Browse the current software database for small business stacks.')}
      <section class="section">${grid(tools.map(card))}</section>`,
  })

const toolPage = (tool) => {
  const peers = tools
    .filter((item) => item.category === tool.category && item.slug !== tool.slug)
    .slice(0, 4)

  return page({
    path: `/tools/${tool.slug}/`,
    title: `${tool.name} Review for Small Business - ToolStackFinder`,
    description: `${tool.name} review for small business teams comparing ${categoryTitle(tool.category).toLowerCase()} tools, pricing fit, use cases, alternatives, and adoption notes.`,
    content: `${hero(
      `${tool.name} review`,
      `${tool.name} is listed in the ${categoryTitle(tool.category)} category. This review summarizes where it fits, who should consider it, and what to verify before buying.`,
      `<div class="hero-actions"><a class="primary" href="${tool.url}" rel="sponsored nofollow noopener" target="_blank">Visit ${tool.name}</a><a class="secondary" href="/categories/${tool.category}/">Compare ${categoryTitle(tool.category)}</a></div>`,
    )}
      <section class="content-blocks">
        <article class="content">
          <h2>Quick fit</h2>
          <p>${toolSummary(tool)}</p>
          <ul>
            <li><strong>Category:</strong> ${categoryTitle(tool.category)}</li>
            <li><strong>Pricing signal:</strong> ${tool.price}</li>
            <li><strong>Best for:</strong> ${tool.audience.join(', ')}</li>
            <li><strong>Core features:</strong> ${tool.features.join(', ')}</li>
          </ul>
        </article>
        <article class="content">
          <h2>Best use cases</h2>
          <p>${bestForLine(tool)}</p>
          <ul>
            <li>Shortlisting software before a small business commits to a stack.</li>
            <li>Comparing tool fit against budget, team size, and workflow complexity.</li>
            <li>Checking whether a category-specific tool can replace manual spreadsheets or disconnected apps.</li>
          </ul>
        </article>
        <article class="content">
          <h2>What to verify</h2>
          <p>Pricing, plan limits, support levels, integrations, and data handling can change. Verify the current plan page and terms on the provider website before purchasing.</p>
          <ul>
            <li>Free plan limits or trial restrictions</li>
            <li>Monthly versus annual pricing</li>
            <li>Export, automation, user, or usage limits</li>
            <li>Cancellation, data export, and support policies</li>
          </ul>
        </article>
        <article class="content">
          <h2>Alternatives</h2>
          <p>Compare ${tool.name} with similar tools in the same category before deciding.</p>
          <div class="mini-link-grid">
            ${peers
              .map(
                (peer) =>
                  `<a href="/tools/${peer.slug}/"><strong>${peer.name}</strong><span>${peer.description}</span></a>`,
              )
              .join('') || '<p>No direct alternatives are listed in this category yet.</p>'}
          </div>
        </article>
      </section>`,
  })
}

const finderPage = () =>
  page({
    path: '/tool-finder/',
    title: 'SaaS Tool Finder - ToolStackFinder',
    description:
      'Use a guided software finder to shortlist SaaS tools by business type, category, and budget.',
    content: `${hero('SaaS tool finder', 'Choose your category, budget, and business type to get a practical shortlist.')}
      <section class="finder-app">
        <label>Category<select id="category">${categories.map((category) => `<option value="${category.slug}">${category.title}</option>`).join('')}</select></label>
        <label>Budget<select id="budget"><option value="free">Free or starter</option><option value="low">Low-cost</option><option value="medium">Medium</option><option value="high">Higher budget</option></select></label>
        <label>Business type<select id="audience"><option value="freelancer">Freelancer</option><option value="small-business">Small business</option><option value="service">Service business</option><option value="creator">Creator</option><option value="marketer">Marketer</option></select></label>
        <div id="results" class="grid"></div>
      </section>
      <script>
        const tools = ${JSON.stringify(tools)};
        const render = () => {
          const category = document.querySelector('#category').value;
          const budget = document.querySelector('#budget').value;
          const audience = document.querySelector('#audience').value;
          const matches = tools
            .map((tool) => ({
              ...tool,
              score: (tool.category === category ? 2 : 0) + (tool.budget === budget ? 1 : 0) + (tool.audience.includes(audience) ? 1 : 0)
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);
          document.querySelector('#results').innerHTML = matches.map((tool) => \`
            <article class="tool-card"><div><span>\${tool.category}</span><h3>\${tool.name}</h3><p>\${tool.description}</p></div><a href="\${tool.url}" rel="sponsored nofollow noopener" target="_blank">Visit website</a></article>
          \`).join('');
        };
        document.querySelectorAll('select').forEach((select) => select.addEventListener('change', render));
        render();
      </script>`,
  })

const categoryPage = (category) => {
  const advice = categoryAdvice(category)
  return page({
    path: `/categories/${category.slug}/`,
    title: `Best ${category.title} Tools for Small Business - ToolStackFinder`,
    description: category.description,
    content: `${hero(`${category.title} tools`, category.description)}
      <section class="section">${grid(advice.tools.map(card))}</section>
      <section class="content-blocks">
        <article class="content">
          <h2>How to choose ${category.title.toLowerCase()} software</h2>
          <p>Start with the workflow you need today, then compare price, integrations, ease of use, and whether the tool can grow with your business.</p>
          <ul>
            <li>Write down the exact workflow you want to improve.</li>
            <li>Check whether the tool supports your team size and budget.</li>
            <li>Confirm integrations with the apps you already use.</li>
            <li>Test export options before storing important business data.</li>
          </ul>
        </article>
        <article class="content">
          <h2>Starter recommendation</h2>
          <p>${advice.text}</p>
          <p>For a small business, the best tool is usually the one your team will actually use every week, not the one with the longest feature list.</p>
        </article>
        <article class="content">
          <h2>Common mistakes</h2>
          <ul>
            <li>Buying a higher plan before confirming real usage.</li>
            <li>Ignoring migration effort and staff training time.</li>
            <li>Choosing a tool without checking mobile, export, and support limits.</li>
            <li>Adding overlapping software that creates duplicate records.</li>
          </ul>
        </article>
      </section>`,
  })
}

const comparisonPage = (comparison) => {
  const left = toolBySlug.get(comparison.left)
  const right = toolBySlug.get(comparison.right)
  const sharedCategory = left.category === right.category ? categoryTitle(left.category) : 'SaaS'
  return page({
    path: `/compare/${comparison.slug}/`,
    title: `${comparison.title} - ToolStackFinder`,
    description: `Compare ${left.name} and ${right.name} for small business software stacks.`,
    content: `${hero(comparison.title, `Compare ${left.name} and ${right.name} by use case, budget, and workflow fit.`)}
      <section class="compare">
        ${card(left)}
        ${card(right)}
      </section>
      <section class="content-blocks">
        <article class="content">
          <h2>Quick recommendation</h2>
          <p>Pick ${left.name} if ${left.features.slice(0, 2).join(' and ')} are the most important parts of your ${sharedCategory.toLowerCase()} workflow. Pick ${right.name} if ${right.features.slice(0, 2).join(' and ')} match your day-to-day work better.</p>
        </article>
        <article class="content">
          <h2>Best for</h2>
          <ul>
            <li><strong>${left.name}:</strong> ${bestForLine(left)}</li>
            <li><strong>${right.name}:</strong> ${bestForLine(right)}</li>
          </ul>
        </article>
        <article class="content">
          <h2>Pricing notes</h2>
          <p>${left.name}: ${left.price}. ${right.name}: ${right.price}. Always recheck the provider websites because SaaS pricing, plan limits, and included features change often.</p>
        </article>
        <article class="content">
          <h2>Decision checklist</h2>
          <ul>
            <li>Does it solve the workflow you need this month?</li>
            <li>Can your team adopt it without long setup work?</li>
            <li>Does the starter plan have the features you actually need?</li>
            <li>Can you export your data if you switch later?</li>
          </ul>
        </article>
      </section>`,
  })
}

const calculatorPage = () =>
  page({
    path: '/saas-cost-calculator/',
    title: 'SaaS Cost Calculator - ToolStackFinder',
    description:
      'Estimate monthly and annual SaaS stack cost from tools, seats, and average subscription price.',
    content: `${hero('SaaS cost calculator', 'Estimate how much a software stack costs per month and per year.')}
      <section class="finder-app">
        <label>Number of tools<input id="tools" type="number" value="6" min="0"></label>
        <label>Average monthly price<input id="price" type="number" value="29" min="0"></label>
        <label>Seats<input id="seats" type="number" value="2" min="1"></label>
        <div class="result"><strong id="monthly">${money(348)}</strong><span>Estimated monthly cost</span></div>
        <div class="result"><strong id="annual">${money(4176)}</strong><span>Estimated annual cost</span></div>
      </section>
      <script>
        const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
        const calc = () => {
          const total = Number(document.querySelector('#tools').value) * Number(document.querySelector('#price').value) * Number(document.querySelector('#seats').value);
          document.querySelector('#monthly').textContent = money.format(total);
          document.querySelector('#annual').textContent = money.format(total * 12);
        };
        document.querySelectorAll('input').forEach((input) => input.addEventListener('input', calc));
        calc();
      </script>`,
  })

const methodologyPage = () =>
  page({
    path: '/methodology/',
    title: 'Recommendation Methodology - ToolStackFinder',
    description:
      'Learn how ToolStackFinder evaluates SaaS tools by use case, budget, business type, pricing, and workflow fit.',
    content: `${hero(
      'How ToolStackFinder recommends software.',
      'We prioritize practical fit for freelancers and small businesses: use case, budget, ease of adoption, workflow match, and long-term flexibility.',
    )}
      <section class="content">
        <h2>Evaluation factors</h2>
        <ul>
          <li><strong>Use-case fit:</strong> whether the tool solves a clear workflow problem for the category.</li>
          <li><strong>Budget fit:</strong> whether the tool has a free, starter, low-cost, or higher-budget plan.</li>
          <li><strong>Business type:</strong> whether the tool fits freelancers, service businesses, creators, ecommerce, marketers, or small teams.</li>
          <li><strong>Adoption cost:</strong> how much setup, migration, and training the tool may require.</li>
          <li><strong>Verification:</strong> users should confirm current pricing, terms, and features on the provider website before purchasing.</li>
        </ul>
      </section>
      <section class="content">
        <h2>Affiliate policy</h2>
        <p>ToolStackFinder may earn commissions from software providers when visitors click sponsored links or sign up. Affiliate relationships should not be the only reason a tool appears on a page. We avoid claiming hands-on testing unless a tool has actually been tested.</p>
      </section>
      <section class="content">
        <h2>Update process</h2>
        <p>SaaS pricing and features change frequently. Pages should be refreshed as programs approve affiliate links, tools change plans, or better options become available.</p>
      </section>`,
  })

const simplePage = ({ path, title, body }) =>
  page({
    path,
    title: `${title} - ${site.name}`,
    description: `${title} for ${site.name}.`,
    content: `<section class="legal"><h1>${title}</h1>${body}</section>`,
  })

const styles = `:root{--ink:#171a1f;--muted:#667064;--line:#dddcd4;--wash:#f1efe7;--accent:#2f6f5e;--focus:#d4f48f;--font:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}body{background:#fafaf8;color:var(--ink);font-family:var(--font);margin:0}.topbar{align-items:center;background:#fafaf8;border-bottom:1px solid var(--line);display:flex;gap:28px;justify-content:space-between;padding:18px clamp(18px,4vw,56px);position:sticky;top:0;z-index:10}.brand{align-items:center;color:var(--ink);display:flex;font-weight:850;gap:10px;text-decoration:none}.brand span{align-items:center;background:var(--ink);border-radius:6px;color:white;display:inline-flex;height:34px;justify-content:center;width:34px}.topbar nav,.footer nav{display:flex;flex-wrap:wrap;gap:16px}.topbar a,.footer a{color:var(--muted);font-weight:750;text-decoration:none}.hero{display:grid;gap:40px;grid-template-columns:minmax(0,1fr) 360px;padding:70px clamp(18px,4vw,56px) 44px}.hero h1{font-size:clamp(42px,6vw,76px);letter-spacing:0;line-height:.95;margin:0;max-width:880px}.hero p{color:var(--muted);font-size:18px;line-height:1.6;max-width:720px}.hero-actions{display:flex;gap:12px;margin-top:30px}.primary,.secondary,.tool-card a{border-radius:6px;display:inline-flex;font-weight:850;min-height:42px;padding:10px 14px;text-decoration:none}.primary,.tool-card a{background:var(--accent);color:white}.secondary{border:1px solid var(--line);color:var(--ink)}.finder-panel{background:var(--ink);border-radius:8px;color:white;display:flex;flex-direction:column;justify-content:flex-end;min-height:280px;padding:24px}.finder-panel span,.tool-card span{color:var(--muted);display:block;font-size:12px;font-weight:850;text-transform:uppercase}.finder-panel span{color:#dfe8d7}.finder-panel strong{font-size:28px;line-height:1.1}.section,.finder-app,.content,.legal{border-top:1px solid var(--line);padding:46px clamp(18px,4vw,56px)}.section h2{font-size:34px;margin:0 0 18px}.grid{display:grid;gap:16px;grid-template-columns:repeat(3,minmax(0,1fr))}.category-card,.tool-card,.content,.legal,.result{background:white;border:1px solid var(--line);border-radius:8px;color:var(--ink);padding:22px;text-decoration:none}.category-card h3,.tool-card h3{margin:0 0 10px}.category-card p,.tool-card p,.content p,.legal p,.legal li{color:var(--muted);line-height:1.6}.tool-card{display:flex;flex-direction:column;gap:14px;justify-content:space-between}.tool-card ul{color:var(--muted);line-height:1.55;margin:0;padding-left:18px}.finder-app{display:grid;gap:16px;grid-template-columns:repeat(3,minmax(0,1fr))}.finder-app .grid{grid-column:1/-1}label{color:var(--muted);display:grid;font-size:12px;font-weight:850;gap:8px;text-transform:uppercase}input,select{background:white;border:1px solid var(--line);border-radius:6px;color:var(--ink);font:700 14px/1.35 var(--font);min-height:42px;padding:0 12px;width:100%}.compare{border-top:1px solid var(--line);display:grid;gap:16px;grid-template-columns:repeat(2,minmax(0,1fr));padding:46px clamp(18px,4vw,56px)}.result strong{display:block;font-size:32px}.result span{color:var(--muted)}.footer{background:var(--ink);color:white;display:flex;gap:24px;justify-content:space-between;padding:34px clamp(18px,4vw,56px)}.footer p{color:#c6cec4;margin:8px 0 0}@media(max-width:900px){.topbar,.footer{align-items:flex-start;flex-direction:column}.hero,.grid,.finder-app,.compare{grid-template-columns:1fr}.hero{padding-top:44px}}`

const build = async () => {
  routes.length = 0
  await rm(outDir, { force: true, recursive: true })
  await mkdir(outDir, { recursive: true })
  await writeFile(join(outDir, 'styles.css'), premiumStyles)

  await writePage('/', homePage())
  await writePage('/tools/', toolsPage())
  for (const tool of tools) {
    await writePage(`/tools/${tool.slug}/`, toolPage(tool))
  }
  await writePage('/tool-finder/', finderPage())
  await writePage('/saas-cost-calculator/', calculatorPage())
  await writePage('/methodology/', methodologyPage())
  for (const category of categories) {
    await writePage(`/categories/${category.slug}/`, categoryPage(category))
  }
  for (const comparison of comparisons) {
    await writePage(`/compare/${comparison.slug}/`, comparisonPage(comparison))
  }
  await writePage(
    '/affiliate-disclosure/',
    simplePage({
      path: '/affiliate-disclosure/',
      title: 'Affiliate Disclosure',
      body: '<p>ToolStackFinder may earn commissions when visitors click sponsored links or sign up for software through partner links. Recommendations should remain useful and transparent even when a partner relationship exists.</p><p>Pricing, features, and commissions can change. Always verify details on the software provider website before purchasing.</p>',
    }),
  )
  await writePage(
    '/privacy/',
    simplePage({
      path: '/privacy/',
      title: 'Privacy Policy',
      body: '<p>ToolStackFinder is designed as a public software research site. We may use analytics to understand page usage and may use affiliate links to track outbound partner clicks.</p><p>If you contact us, we use your email and message to respond to your request.</p>',
    }),
  )
  await writePage(
    '/terms/',
    simplePage({
      path: '/terms/',
      title: 'Terms',
      body: '<p>ToolStackFinder provides software research and comparison helpers for informational purposes. We do not guarantee that any tool is the best fit for every business.</p><p>You are responsible for reviewing pricing, contracts, data handling, and terms with each software provider before buying.</p>',
    }),
  )
  await writePage(
    '/contact/',
    simplePage({
      path: '/contact/',
      title: 'Contact',
      body: `<p>For corrections, partnership questions, or support, email <a href="mailto:${site.email}">${site.email}</a>.</p>`,
    }),
  )

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${site.domain}${route}</loc>
  </url>`,
  )
  .join('\n')}
</urlset>`

  await writeFile(join(outDir, 'sitemap.xml'), sitemap)
  await writeFile(
    join(outDir, 'robots.txt'),
    `User-agent: *
Allow: /

Sitemap: ${site.domain}/sitemap.xml
`,
  )
  await writeFile(
    join(outDir, 'ads.txt'),
    `google.com, pub-8034493444478789, DIRECT, f08c47fec0942fa0
`,
  )
  await writeFile(
    join(outDir, '_redirects'),
    `/* /index.html 200
`,
  )
}

await build()
