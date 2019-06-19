package com.alok14741.ppmtool.services;

import com.alok14741.ppmtool.domain.Backlog;
import com.alok14741.ppmtool.domain.Project;
import com.alok14741.ppmtool.domain.ProjectTask;
import com.alok14741.ppmtool.exceptions.ProjectNotFoundException;
import com.alok14741.ppmtool.repositories.BacklogRepository;
import com.alok14741.ppmtool.repositories.ProjectRepository;
import com.alok14741.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        try {
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

            projectTask.setBacklog(backlog);

            Integer backLogSequence = backlog.getPTSequence();
            backLogSequence++;

            backlog.setPTSequence(backLogSequence);

            projectTask.setProjectSequence(projectIdentifier + "-" + backLogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            if (projectTask.getPriority() == null) {
                projectTask.setPriority(3);
            }

            if (projectTask.getStatus() == null || projectTask.getStatus() == "") {
                projectTask.setStatus("TO-DO");
            }

            return projectTaskRepository.save(projectTask);
        } catch (Exception e) {
            throw new ProjectNotFoundException("Project Not Found");
        }
    }

    public Iterable<ProjectTask> findBacklogById(String backlog_id) {
        Project project = projectRepository.findByProjectIdentifier(backlog_id);
        if (project == null) {
            throw new ProjectNotFoundException("Project with ID '" + backlog_id + "' does not exists");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlog_id);
    }
}
