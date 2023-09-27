document.write(`<nav
class="navbar navbar-default navbar-static-top"
role="navigation"
style="margin-bottom: 0"
>
<div class="navbar-header">
  <button
    type="button"
    class="navbar-toggle"
    data-toggle="collapse"
    data-target=".navbar-collapse"
  >
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
  <a class="navbar-brand" href="{{URL}}/admin" style="color: #045942"
    >NITJ TPO - SuperUser
  </a>
</div>

<div class="navbar-default sidebar" role="navigation">
  <div class="sidebar-nav navbar-collapse">
    <ul class="nav" id="side-menu">
      <li class="sidebar-search">
        <div class="input-group custom-search-form">
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
          />
          <span class="input-group-btn">
            <button class="btn btn-default" type="button">
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </li>

      <li>
        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> Announcements<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
          <li>
            <a href="{{URL}}/admin/announcements"><i class="fa fa-edit fa-fw"></i> Add New Announcement</a>
          </li>
          <li>
            <a href="{{URL}}/admin/announcements"><i class="fa fa-edit fa-fw"></i> Edit Announcement</a>
          </li>
        </ul>
      </li>

      {{!-- <li>
        <a href="#"><i class="fa fa-envelope" aria-hidden="true"></i> Notices<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
          <li>
            <a href="{{URL}}/admin/notices"><i class="fa fa-edit fa-fw"></i> Add New Notice</a>
          </li>
          <li>
            <a href="{{URL}}/admin/notices"><i class="fa fa-edit fa-fw"></i> Edit Notice</a>
          </li>
        </ul>
      </li> --}}
      <li>
        <a href="#"><i class="fa fa-newspaper-o" aria-hidden="true"></i> NITJ Message<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
          <li>
            <a href="{{URL}}/admin/nitjMessage"><i class="fa fa-edit fa-fw"></i> Add New Message</a>
          </li>
          <li>
            <a href="{{URL}}/admin/nitjMessage"><i class="fa fa-edit fa-fw"></i> Edit Message</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="#"><i class="fa fa-history"></i> Processes<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
          <li>
            <a href="{{URL}}/admin/processes"><i class="fa fa-edit fa-fw"></i> Add New Process</a>
          </li>
          <li>
            <a href="{{URL}}/admin/processes"><i class="fa fa-edit fa-fw"></i> Edit Process</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="#"><i class="fa fa-institution" aria-hidden="true"></i> Policies<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
          <li>
            <a href="{{URL}}/admin/policies"><i class="fa fa-edit fa-fw"></i> Add New Policy</a>
          </li>
          <li>
            <a href="{{URL}}/admin/policies"><i class="fa fa-edit fa-fw"></i> Edit Policy</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="#"><i class="fa fa-newspaper-o" aria-hidden="true"></i> Placement Insights<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
          <li>
            <a href="{{URL}}/admin/placement_insights"><i class="fa fa-edit fa-fw"></i> Add New Insight info</a>
          </li>
          <li>
            <a href="{{URL}}/admin/placement_insights"><i class="fa fa-edit fa-fw"></i> Edit Insight info</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="#"><i class="fa fa-newspaper-o" aria-hidden="true"></i> Insights Images <span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
           <li>
            <a href="{{URL}}/admin/placement_insights_img"><i class="fa fa-edit fa-fw"></i> Add New Insight Images</a>
          </li>
          <li>
            <a href="{{URL}}/admin/placement_insights_img"><i class="fa fa-edit fa-fw"></i> Edit Insight Images</a>
          </li>
          </ul>
      </li>

      <li>
        <a href="#"><i class="fa fa-newspaper-o" aria-hidden="true"></i> Internship Insights<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
          <li>
            <a href="{{URL}}/admin/internship_insights"><i class="fa fa-edit fa-fw"></i> Add New Insight</a>
          </li>
          <li>
            <a href="{{URL}}/admin/internship_insights"><i class="fa fa-edit fa-fw"></i> Edit Insight</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="#"><i class="fa fa-question" aria-hidden="true"></i> FAQ's<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
          <li>
            <a href="{{URL}}/admin/faqs"><i class="fa fa-edit fa-fw"></i> Add New FAQ</a>
          </li>
          <li>
            <a href="{{URL}}/admin/faqs"><i class="fa fa-edit fa-fw"></i> Edit FAQ</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="#"><i class="fa fa-users" aria-hidden="true"></i> People<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
          <li>
            <a href="{{URL}}/admin/people"><i class="fa fa-edit fa-fw"></i> Add New Person</a>
          </li>
          <li>
            <a href="{{URL}}/admin/people"><i class="fa fa-edit fa-fw"></i> Edit Person</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="#"><i class="fa fa-line-chart" aria-hidden="true"></i> Placement Stats<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
          <li>
            <a href="{{URL}}/admin/placement_stats"><i class="fa fa-edit fa-fw"></i> Add New Stats</a>
          </li>
          <li>
            <a href="{{URL}}/admin/placement_stats"><i class="fa fa-edit fa-fw"></i> Edit Stats</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="#"><i class="fa fa-code" aria-hidden="true"></i> Post Recruiters<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
          <li>
            <a href="{{URL}}/admin/PRDetails"><i class="fa fa-edit fa-fw"></i> Add New Recruiters Details</a>
          </li>
          <li>
            <a href="{{URL}}/admin/PRDetails"><i class="fa fa-edit fa-fw"></i> Edit Recruiters Details</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="#"><i class="fa fa-user" aria-hidden="true"></i> Users<span class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
           
          <li>
            <a href="{{URL}}/admin/users"><i class="fa fa-edit fa-fw"></i> Add New Person</a>
          </li>
          <li>
            <a href="{{URL}}/admin/users"><i class="fa fa-edit fa-fw"></i> Edit Person</a>
          </li>
        </ul>
      </li>
      
    </ul>
  </div>
</div>
</nav>`)