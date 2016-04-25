function Cell(x, y){
  this.pos_x = x;
  this.pos_y = y;
  this.state = false;       // current state; true = alive | false = dead
  this.is_checked = false;  // whether or not checked in current cycle
  this.swap = false;        // going to switch state in next cycle

  this.getPosX = function(){return this.pos_x};
  this.getPosY = function(){return this.pos_y};
  this.isAlive = function(){return this.state};
  this.isChecked = function(){return this.is_checked};
  this.isAvailableSwap = function(){return this.swap};
  this.switchState = function(){
    if(this.state)
      this.state = false;
    else
      this.state = true;
  }
}

function cycle(cells){
  for(var i = 0; i<cells.length; i++){
    if(cells[i].isAvailableSwap()){
      cells[i].switchState();
      cells[i].swap = false;
    }
    cells[i].is_checked = false;
  }
}

function calculateCell(c,n,w){
  if(c.isChecked()) return false;

  c.is_checked = true;

  var aliveNeighbours = 0;
  var tmp;
  for(var row = -1; row<2; row++){
    for(var column = -1; column<2; column++){
      if(row == 0 && column == 0) continue;

      if(w[(c.getPosX()+row)*n+(c.getPosY()+column)] != undefined){
        tmp = w[(c.getPosX()+row)*n+(c.getPosY()+column)];
        if(tmp.isAlive()) aliveNeighbours++;
        if(c.isAlive()) calculateCell(tmp,n,w);
      }
    }
  }

  if( c.isAlive() == false && aliveNeighbours == 3) c.swap = true;                            // flaga ożywania
  if( c.isAlive() == true && (aliveNeighbours != 2 && aliveNeighbours != 3) ) c.swap = true;  // flaga umierania
}

export default function gameOfLife(world_size, live_cell_coordinates, generations){
    if(world_size < 0 || world_size > 100) return [];
    if(live_cell_coordinates.length > world_size*world_size) return [];

    generations.sort(function(a,b){return a>b;})
    var last_gen = generations[generations.length-1];

    // inicjalizacja
    var world = [];
    for(var row = 0; row<world_size; row++){
      for(var column = 0; column<world_size; column++){
        world[row*world_size+column] = new Cell(row,column);
      }
    }

    //Ożywienie pokolenia zero
    for(var i = 0; i<live_cell_coordinates.length; i++){
      if(world[live_cell_coordinates[i][0]*world_size+live_cell_coordinates[i][1]] != undefined)
        world[live_cell_coordinates[i][0]*world_size+live_cell_coordinates[i][1]].state = true;
    }

    var wynik = [];
    var counter = 0;

    for(var cycle_no = 0; cycle_no<=last_gen; cycle_no++){
      // Zapisanie żywych komórek istotnej aktualnej generacji do wyniku
      // Zakładamy że lista generacji nie zawiera duplikatów :)
      if(cycle_no == generations[counter]){
        wynik.push([]);
        for(var i = 0; i<world.length; i++){
          if(world[i].isAlive()) wynik[counter].push([world[i].getPosX(), world[i].getPosY()]);
        }
        counter++;
      };

      // Kalkulacja do nastepnej generacji
      for(var row = 0; row<world_size; row++){
        for(var column = 0; column<world_size; column++){
          // Czy musimy kalkulowac ta komorke?
          if(world[row*world_size+column].isAlive()){
            calculateCell(world[row*world_size+column], world_size, world);
          }
        }
      }
      cycle(world);
    }

    return wynik;
}
