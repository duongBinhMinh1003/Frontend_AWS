import React, { useState } from "react";
import { Share2, LayoutList, MessageSquare } from "lucide-react";
import AddTaskModal from "../../component/Modal/AddTaskModal";
import MainLayout from "../../layout/MainLayout";
import ProjectHeader from "../../component/Header/ProjectHeader";
import InlineAddSection from "../../component/Modal/InlineAddSection";
import SectionItem from "../../component/Section/SectionItem";
import { useParams } from "react-router-dom";

export default function ProjectPage() {
  const [showModal, setShowModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [sections, setSections] = useState([]);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const { projectName } = useParams();
  // ✅ Thêm Task vào section cụ thể
  const handleAddTask = (newTask) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === currentSection
          ? {
              ...section,
              tasks: [...section.tasks, { ...newTask, id: Date.now() }],
            }
          : section
      )
    );
    setShowModal(false);
    setCurrentSection(null);
  };

  // ✅ Thêm Section mới
  const handleAddSection = () => {
    if (newSectionName.trim()) {
      setSections([
        ...sections,
        { id: Date.now(), name: newSectionName, tasks: [] },
      ]);
      setNewSectionName("");
      setIsAddingSection(false);
    }
  };
  const handleUpdateTask = (sectionId, updatedTask) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              ),
            }
          : section
      )
    );
  };
  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* HEADER */}
        <ProjectHeader></ProjectHeader>

        {/* MAIN CONTENT */}
        <main className="px-10 py-6">
          <h1 className="text-2xl font-bold mb-4">{projectName}</h1>

          {/* Section list */}

          <div className="space-y-4">
            {sections.map((section) => (
              <SectionItem
                handleUpdateTask={handleUpdateTask}
                key={section.id}
                section={section}
                onAddTaskClick={(id) => {
                  setCurrentSection(id);
                  setShowModal(true);
                }}
              />
            ))}
          </div>

          <InlineAddSection
            newSectionName={newSectionName}
            setNewSectionName={setNewSectionName}
            handleAddSection={handleAddSection}
            setIsAddingSection={setIsAddingSection}
          ></InlineAddSection>
        </main>

        {/* MODAL ADD TASK */}
        <AddTaskModal
          open={showModal}
          onCancel={() => {
            setShowModal(false);
            setCurrentSection(null);
          }}
          onAdd={handleAddTask}
        />
      </div>
    </MainLayout>
  );
}
