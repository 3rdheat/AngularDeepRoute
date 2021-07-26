import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-component-deactivate.interface';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  allowEdit = false;

  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    const id = +this.route.snapshot.params['id'];
    
    if(!isNaN(id)){
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['AllowEdit'] === '1' ? true : false;
      }
    )


  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.router.navigate(['/servers', this.server.id]);
    this.changesSaved = true;
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean>{
    if(!this.allowEdit){
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved)
    {
      return confirm('Do you want to discard the changes?'); 
    }
    else{
      return true;
    }
  }

  
}
