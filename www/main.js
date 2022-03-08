'use strict';

function toggleDisplay(e) {
  const expandableElement = e.parentElement.querySelector('.expandable');
  console.log(expandableElement);
  if (expandableElement) {
    if (expandableElement.classList.contains('collapsed')) {
      expandableElement.classList.remove('collapsed');
      expandableElement.parentElement.classList.remove('collapsed');
    } else {
      expandableElement.classList.add('collapsed');
      expandableElement.parentElement.classList.add('collapsed');
    }
  }
}

const content = [
  {
    name: 'Unit 1: Server &amp HTML',
    description: 'Webserver and HTML',
    collapsed: true,
    item: [
      {
        class: 'note',
        title: 'Notes',
        link: 'https://github.com/leesjensen/cs260/blob/main/Unit1.md',
      },
      {
        class: 'slide',
        title: '1.1 - Introduction',
        link: 'https://docs.google.com/presentation/d/1Y7J2fmn9VjY8NF9lSPQgLVbVn1qQR4DCzu57lUOCclw/edit?usp=sharing',
      },
      {
        class: 'slide',
        title: '1.2 - Server Setup',
        link: 'https://docs.google.com/presentation/d/1S5nLhokdBJeBUSW051a_BtwMKD7UA6w-vtvNrSw7qjU/edit?usp=sharing',
      },
      {
        class: 'exercise',
        title: 'D3, D4, D9, A1: Server Setup Video',
        link: 'https://youtu.be/KMgST_v4qlM',
      },
      {
        class: 'slide',
        title: '1.3 - Editors &amp; HTML',
        link: 'https://docs.google.com/presentation/d/1fdRNqK6dlWi08_88BnVjYAdYWNfqwGhrQrv6GE7TdYc/edit?usp=sharing',
      },
      {
        class: 'exercise',
        title: 'D6: HTML Basics',
        link: 'html/html-intro',
      },
      {
        class: 'slide',
        title: '1.4 - Git &amp; HTTP',
        link: 'https://docs.google.com/presentation/d/1DnI1P4wV-ndbDW59QeDppIyBE4u-mZuAEbXLVuOgDAo/edit?usp=sharing',
      },
    ],
  },
  {
    name: 'Unit 2: CSS',
    description: 'CSS and design',
    collapsed: true,
    item: [
      {
        class: 'note',
        link: 'https://github.com/leesjensen/cs260/blob/main/Unit2.md',
        title: 'Notes',
      },
      {
        class: 'slide',
        link: 'https://docs.google.com/presentation/d/1d_ym6Q5Ttibrm3MvJXEuXPcqowOi_1k71V-zHa4WSQ4/edit?usp=sharing',
        title: '2.1 - CSS Basics',
      },
      {
        class: 'demo',
        link: 'css/css-basics',
        title: 'CSS Basics',
      },
      {
        class: 'demo',
        link: 'css/css-font',
        title: 'CSS Font',
      },
      {
        class: 'exercise',
        link: 'css/css-c1-basics',
        title: 'C1: Basics',
      },
      {
        class: 'slide',
        link: 'https://docs.google.com/presentation/d/1fRxpx68_1movOy8br38NF7laM4nHUFB-4kYhxfnEQNI/edit?usp=sharing',
        title: '2.2 - CSS Responsive',
      },
      {
        class: 'demo',
        link: 'css/css-flex',
        title: 'CSS Flex',
      },
      {
        class: 'demo',
        link: 'css/css-grid',
        title: 'CSS Grid',
      },
      {
        class: 'exercise',
        link: 'css/css-c2-responsive',
        title: 'C2: Responsive',
      },
      {
        class: 'demo',
        link: 'https://git.cs260.click/',
        title: 'Hosting on GitHub pages',
      },
      {
        class: 'project',
        link: 'https://lab1.cs260.click',
        title: 'Lab 1: Photographer',
      },
      {
        class: 'slide',
        link: 'https://docs.google.com/presentation/d/1fRnXFrAKR7MV4FoMb3QUPv-1HkhxBfYqs6aw_RC5NQk/edit?usp=sharing',
        title: '2.3 - Design',
      },
      {
        class: 'exercise',
        link: 'css/css-c4-design',
        title: 'C4: Design',
      },
      {
        class: 'slide',
        link: 'https://docs.google.com/presentation/d/1eBO_uZJRcimGnqq72w3H1DFdHx1paMlFqty395eUq2M/edit?usp=sharing',
        title: '2.4 - The good, bad &amp; ugly',
      },
    ],
  },
  {
    name: 'Unit 3: JS',
    description: 'JavaScript/ECMAScript',
    collapsed: true,
    item: [
      {
        class: 'note',
        title: 'Notes',
        link: 'https://github.com/leesjensen/cs260/blob/main/Unit3.md',
      },
      {
        class: 'slide',
        title: '3.1 - JS Basics',
        link: 'https://docs.google.com/presentation/d/15Ni_4sM0qNBkelF7FGdH6JntZQiH5WY1QSDq3PKvR7U/edit?usp=sharing',
      },
      {
        class: 'exercise',
        title: 'J1, J2, J3: Basics',
        link: 'js/js-j1-j2-j3-basics',
      },
      {
        class: 'slide',
        title: '3.2 - JS Basics',
        link: 'https://docs.google.com/presentation/d/1jM_oat95mWhjVev-1RbEpaYnhQrT8nwQ3lSWJu9dElQ/edit?usp=sharing',
      },
      {
        class: 'slide',
        title: '3.3 - Promises &amp; DOM',
        link: 'https://docs.google.com/presentation/d/1D6K024GRaRQl8dMQqe4VMtN4RBUZgto1_mYhkeIT7mA/edit?usp=sharing',
      },
      {
        class: 'exercise',
        title: 'J4: Promises',
        link: 'js/js-j4-promises',
      },
      {
        class: 'demo',
        title: 'DOM Tutorial',
        link: 'js/js-dom-tutorial',
      },
      {
        class: 'exercise',
        title: 'J5: Table',
        link: 'js/js-j5-table',
      },
      {
        class: 'slide',
        title: '3.4 - Fetch, CORS, &amp; HTTP',
        link: 'https://docs.google.com/presentation/d/1vnu2DFrSeu9aFzRQjyS9aIvoORTyeR_AEJ-E0RsQj6Q/edit?usp=sharing',
      },
      {
        class: 'exercise',
        title: 'J5.5-J5.7: Rest',
        link: 'js/js-j5-rest',
      },
      {
        class: 'project',
        title: 'Lab 2: Weather',
        link: 'https://lab2.cs260.click',
      },
      {
        class: 'slide',
        title: '3.5 - Debugging &amp; Performance',
        link: 'https://docs.google.com/presentation/d/12TwA11lXpqqUudhnxqchmANkL33jKH0zNJIVxtsYA18/edit?usp=sharing',
      },
      {
        class: 'demo',
        title: 'Debug Tutorial',
        link: 'js/js-debug-tutorial',
      },
      {
        class: 'demo',
        title: 'Performance Tutorial',
        link: 'js/js-performance-tutorial',
      },
      {
        class: 'exercise',
        title: 'J6: Debugging',
        link: 'js/js-j6-debugging',
      },
      {
        class: 'slide',
        title: '3.6 - REST, GraphQL, Midterm Review',
        link: 'https://docs.google.com/presentation/d/1dPFbDGXnaU9EfhK-P_FKNpeB-Jlvxq0akKY0X8R5ES0/edit?usp=sharing',
      },
    ],
  },
  {
    name: 'Unit 4: Frontend',
    description: 'Vue - Web framework',
    collapsed: false,
    item: [
      {
        class: 'note',
        title: 'Notes',
        link: 'https://github.com/leesjensen/cs260/blob/main/Unit4.md',
      },
      {
        class: 'slide',
        title: '4.1 - Vue Intro',
        link: 'https://docs.google.com/presentation/d/1TcQm6sVcxXXmgQLWwAm7X3fIYPr2KGGGLh2p0KBlna0/edit?usp=sharing',
      },
      {
        class: 'demo',
        title: 'Basic Vue Tutorial',
        link: 'vue/vue-basic-tutorial',
      },
      {
        class: 'exercise',
        title: 'V0: Rest Cities',
        link: 'vue/vue-v0-rest',
      },
      {
        class: 'exercise',
        title: 'V1: Learning Vue',
        link: 'vue/vue-v1-learning',
      },
      {
        class: 'exercise',
        title: 'V2: Todo List',
        link: 'vue/vue-v2-todo',
      },
      {
        class: 'project',
        title: 'Lab 3a: XKCD Browser',
        link: 'https://lab3a.cs260.click',
      },
      {
        class: 'slide',
        title: '4.2 - Vue Components',
        link: 'https://docs.google.com/presentation/d/1lzcKt6aPJSsPcdzYC72icbe7HQSwGF9_Ely6qq0uVX4/edit?usp=sharing',
      },
      {
        class: 'slide',
        title: '4.3 - Vue CLI',
        link: 'https://docs.google.com/presentation/d/1gfb6afyhari2bZTEHvWMrYIpAGoL1AH1iNTTdVDew_M/edit?usp=sharing',
      },
      {
        class: 'demo',
        title: 'CLI Demo',
        link: 'vue/vue-cli-demo/dist',
      },
      {
        class: 'demo',
        title: 'CLI Users',
        link: 'vue/vue-cli-users/dist',
      },
      {
        class: 'exercise',
        title: 'V3: CLI',
        link: 'vue/vue-v3-cli/dist',
      },
      {
        class: 'project',
        title: 'Lab 3b: Grocery Store',
        link: 'https://lab3b.cs260.click',
      },
      {
        class: 'slide',
        title: '4.4 - Vue Router',
        link: 'https://docs.google.com/presentation/d/1dZpn822ZIchuKixoo3zjRuU944zMYNVKB6D07DIfNzY/edit?usp=sharing',
      },
      {
        class: 'demo',
        title: 'Basic Router',
        link: 'vue/vue-basic-router-tutorial',
      },
      {
        class: 'demo',
        title: 'Vue Router',
        link: 'vue/vue-router-demo/dist',
      },
      {
        class: 'demo',
        title: 'Vue Router Examples',
        link: 'https://vue-router.cs260.click',
      },
      {
        class: 'slide',
        title: '4.5 - Vue Inside',
        link: 'https://docs.google.com/presentation/d/1QoXvqO6ZeoEwNPNKL97yh66r_-GRqs7EJ2gZIhB8Ils/edit?usp=sharing',
      },
      {
        class: 'demo',
        title: 'TypeScript',
        link: 'vue/vue-typescript/dist',
      },
      {
        class: 'demo',
        title: 'VueUse',
        link: 'https://vueuse.org',
      },
      {
        class: 'demo',
        title: 'Progressive Web App',
        link: 'https://pwa.cs260.click',
      },
    ],
  },
  {
    name: 'Unit 5: Backend',
    description: 'Node &amp; MongoDB',
    collapsed: false,
    item: [
      {
        class: 'note',
        title: 'Notes',
        link: 'https://github.com/leesjensen/cs260/blob/main/Unit5.md',
      },
      {
        class: 'slide',
        title: '5.1 - Node',
        link: 'https://docs.google.com/presentation/d/16VE0WOabUwNPNY7Yxw3tW_hgzFuKSDDgl3m9c4CYjfQ/edit?usp=sharing',
      },
      {
        class: 'demo',
        title: 'Cities API',
        link: 'api/city?q=.*',
      },
      {
        class: 'demo',
        title: 'XKCD API',
        link: 'api/xkcd/latest',
      },
      {
        class: 'exercise',
        title: 'N1: Learning Node',
        link: 'node-n1-learning-node',
      },
      {
        class: 'exercise',
        title: 'N2: Todo',
        link: 'node-n2-todo',
      },
      {
        class: 'slide',
        title: '5.2 - Express',
        link: 'https://docs.google.com/presentation/d/14SPYZvPVLt_RjeXTRCODxoHS10Z-MJvrvPwwV5gPaY4/edit?usp=sharing',
      },
      {
        class: 'exercise',
        title: 'N2.5: Node Pokemon',
        link: 'node-n2.5-pokemon',
      },
      {
        class: 'exercise',
        title: 'N2.6: Cities',
        link: 'node-n2.6-cities',
      },
      {
        class: 'slide',
        title: '5.3 - Mongo',
        link: 'https://docs.google.com/presentation/d/1Eccr3K68CUAPQmHPxGUrx9-_-_M5LDbT6TyTo3jEb1Q/edit?usp=sharing',
      },
      {
        class: 'exercise',
        title: 'N3: Learning Mongo',
        link: 'node/node-n3-learning-mongo',
      },
      {
        class: 'slide',
        title: '5.4 - Mongo',
        link: 'https://docs.google.com/presentation/d/1lGupKtWmX7xD88_getu8gGv0ORnfm98p8K-RcPcSdIU/edit?usp=sharing',
      },
      {
        class: 'exercise',
        title: 'N4: Mongo Pokemon',
        link: 'node/node-n4-mongo-pokemon',
      },
      {
        class: 'exercise',
        title: 'N5: Full Stack',
        link: 'node/node-n5-full-stack',
      },
      {
        class: 'slide',
        title: '5.5 - Backend',
        link: 'https://docs.google.com/presentation/d/1oZyDQqWHszTMlbNOb4yL1qk5eEKLI3X8J81mjqoHlSc/edit?usp=sharing',
      },
      {
        class: 'project',
        title: 'Lab 4: Museum of Objects',
        link: 'https://lab4.cs260.click',
      },
      {
        class: 'slide',
        title: '5.6 - Backend',
        link: 'https://docs.google.com/presentation/d/1sAgGf_oMJqbkmThUmULstVYwK91kKWibtpLSd6DFZWo/edit?usp=sharing',
      },
    ],
  },
  {
    name: 'Unit 6: Security',
    description: 'Authentication, Exploit Prevention',
    collapsed: true,
    item: [
      {
        class: 'note',
        title: 'Notes',
        link: 'https://github.com/leesjensen/cs260/blob/main/Unit6.md',
      },
      {
        class: 'slide',
        title: '6.1 - Security',
        link: 'https://docs.google.com/presentation/d/1-cTYrCur48ra4bT2QYanjRFJwfrHUg1BBeFXYQYDNgs/edit?usp=sharing',
      },
      {
        class: 'slide',
        title: '6.2 - Auth & Final Prep',
        link: 'https://docs.google.com/presentation/d/1MlsyQjK6mbKl_kIq1t5ZixzJC8eieXcLjnoPpfjMkE0/edit?usp=sharing',
      },
      {
        class: 'exercise',
        title: 'A2: Authenticating',
        link: 'security/security-a2-auth',
      },
      {
        class: 'slide',
        title: '6.3 - Demo Day',
        link: 'https://docs.google.com/presentation/d/1Xgs9R8o5C4Fx-qtqqXUeQEh1pXwpaakeFiX52N1ILrk/edit?usp=sharing',
      },
    ],
  },
];

function load() {
  const writeItems = (unit) => {
    let output = '';
    for (let item of unit.item) {
      output += `
          <li class="${item.class}">
            <a href="${item.link}">${item.title}</a>
          </li>
      `;
    }
    return output;
  };

  const writeUnits = (units) => {
    let output = '';
    for (let unit of units) {
      output += `
        <div class="grid-box ${unit.collapsed ? 'collapsed' : ''}">
          <h2 onclick="toggleDisplay(this)">${unit.name}</h2>
            <p>${unit.description}</p>
            <ul class="expandable ${unit.collapsed ? 'collapsed' : ''}">
              ${writeItems(unit)}
            </ul>
          </h2>
        </div>
      `;
    }
    return output;
  };

  const container = document.querySelector('.grid-container');
  if (container) {
    container.innerHTML = writeUnits(content);
  }
}

load();
