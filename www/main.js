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
    collapsed: false,
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
    collapsed: true,
    item: [
      {
        class: 'note',
        title: 'Notes',
        link: 'https://github.com/leesjensen/cs260/blob/main/Unit4.md',
      },
    ],
  },
  {
    name: 'Unit 5: Backend',
    description: 'Node &amp; MongoDB',
    collapsed: true,
    item: [
      {
        class: 'note',
        title: 'Notes',
        link: 'https://github.com/leesjensen/cs260/blob/main/Unit5.md',
      },
      {
        class: 'demo',
        title: 'Cities API',
        link: 'api/city?q=.*',
      },
      {
        class: 'exercise',
        title: 'N2.6: Cities',
        link: 'node-cities',
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
