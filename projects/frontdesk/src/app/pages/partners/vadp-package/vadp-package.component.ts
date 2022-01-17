import { Component, OnInit} from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';
import { Company } from '../../../vvtk-core/interfaces/vadp-package-models';

@Component({
  selector: 'vvtk-vadp-package',
  templateUrl: './vadp-package.component.html',
  styleUrls: ['./vadp-package.component.scss']
})
export class VadpPackageComponent implements OnInit {
  companies: Company[] = [];
  companyVivotek: Company[] = [];
  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Partners/SIAProgram/VADP/VADPPackage`
      },
      {
        next: resp => {
          const body = resp.json();
          this.companies = body;
          this.filterVivotek();
          this.filterCompany();
        },
        finally: () => { }
      }
    );
  }
  goDistance(location: string): void {
    // window.location.hash = '';
    // window.location.hash = location;
    document.getElementById(location).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }

  filterVivotek() {
    this.companyVivotek = this.companies.filter(companies => companies.companyId === 8);
  }

  filterCompany() {
    this.companies = this.companies.filter(companies => companies.companyId !== 8);
  }
}
