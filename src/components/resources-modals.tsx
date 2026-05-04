import React from "react";
import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResourceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  items: string[];
  content: {
    introduction: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
    tips: string[];
  };
}

interface GuideItem {
  title: string;
  description: string;
  type: string;
  duration: string;
  content: {
    introduction: string;
    steps?: Array<{
      title: string;
      content: string;
    }>;
    sections?: Array<{
      title: string;
      content: string;
    }>;
    tips: string[];
  };
}

interface ResourceDetailModalProps {
  selectedResource: ResourceItem | null;
  onClose: () => void;
}

export function ResourceDetailModal({ selectedResource, onClose }: ResourceDetailModalProps) {
  return (
    <Dialog open={!!selectedResource} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            {selectedResource?.icon && React.createElement(selectedResource.icon, { className: "h-8 w-8 text-black" })}
            {selectedResource?.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {selectedResource?.description}
          </DialogDescription>
        </DialogHeader>

        {selectedResource?.content && (
          <div className="space-y-6">
            <div className="bg-[#FBFBFB] p-4 rounded-lg">
              <p className="text-slate-700 leading-relaxed">
                {selectedResource.content.introduction}
              </p>
            </div>

            <div className="space-y-4">
              {selectedResource.content.sections?.map((section, index) => (
                <div key={index} className="border-l-4 border-black pl-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {selectedResource.content.tips && (
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-3">💡 Quick Tips:</h4>
                <ul className="space-y-2">
                  {selectedResource.content.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-black mt-1">•</span>
                      <span className="text-slate-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface GuideDetailModalProps {
  selectedGuide: GuideItem | null;
  onClose: () => void;
}

export function GuideDetailModal({ selectedGuide, onClose }: GuideDetailModalProps) {
  return (
    <Dialog open={!!selectedGuide} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <FileText className="h-8 w-8 text-black" />
            {selectedGuide?.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-base">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black text-white">
              {selectedGuide?.type}
            </span>
            <span className="text-slate-600">{selectedGuide?.duration}</span>
          </DialogDescription>
        </DialogHeader>

        {selectedGuide?.content && (
          <div className="space-y-6">
            <div className="bg-[#FBFBFB] p-4 rounded-lg">
              <p className="text-slate-700 leading-relaxed">
                {selectedGuide.content.introduction}
              </p>
            </div>

            {selectedGuide.content.steps ? (
              <div className="space-y-4">
                {selectedGuide.content.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {step.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedGuide.content.sections ? (
              <div className="space-y-4">
                {selectedGuide.content.sections.map((section, index) => (
                  <div key={index} className="border-l-4 border-black pl-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {selectedGuide.content.tips && (
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-3">💡 Pro Tips:</h4>
                <ul className="space-y-2">
                  {selectedGuide.content.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-black mt-1">•</span>
                      <span className="text-slate-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}