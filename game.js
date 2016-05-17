let template = (worker) => {
  return `
    <div id="${worker.id}-container">
      <h1>
        refactor:&nbsp<span id="${worker.id}-count">0</span>
      </h1>
      <button id="${worker.id}-button">buy ${worker.name}</button>&nbsp;<span id="${worker.id}-cost"></span>
    </div>
  `;
};

let dollarCount = 0;
let frames = 0;

let workers = {
  engineer: {
    name: 'engineer',
    id: 'engineer',
    count: 0,
    cost: 10,
    production: 1,
  },
};
let spells = {
  refactor: {
    name: 'refactor',
    id: 'refactor',
    count: 0,
    cost: 100,
    production: 2,
  },
};
let consumables = {
};

$('#code-button').click(() => {
  dollarCount++;
});

for (let workerType in workers) {
  let buttonId = '#' + workers[workerType].id + '-button';
  $(buttonId).data('workerType', workerType);

  $(buttonId).click(function () {
    let worker = workers[$(this).data('workerType')];
    if (dollarCount < worker.cost) { return; }
    dollarCount -= worker.cost;
    worker.count++;
    worker.cost = Math.round(Math.pow(worker.cost, 1.1));
  });
}

let update = () => {
  frames++;
  for (let workerType in workers) {
    let worker = workers[workerType];
    if (frames % (120/worker.production) === 0) {
      dollarCount += worker.count;
    }
    $('#' + worker.id + '-count').text(worker.count);
    $('#' + worker.id + '-cost').text(worker.cost + ' pepes');
  }

  $('#dollar-count').text(dollarCount);
  requestAnimationFrame(update);
};

requestAnimationFrame(update);
