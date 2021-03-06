import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};


  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { 
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    )
  }

  ngOnInit() {
    //fetch data from Server Resolver Service *loads data before the component is loaded
   

    // this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // )
  }

  EditServer(){
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

}
