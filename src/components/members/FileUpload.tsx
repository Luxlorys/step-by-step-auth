
import React, { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FileUpload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const xlsxFile = files.find(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );
    
    if (xlsxFile) {
      setUploadedFile(xlsxFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setUploadedFile(file);
    }
  }, []);

  const handleBrowseClick = () => {
    document.getElementById('file-input')?.click();
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-gray-400" />
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              Drop your file here or{' '}
              <button
                onClick={handleBrowseClick}
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Browse
              </button>
              <Info className="inline w-4 h-4 ml-1 text-gray-400" />
            </p>
            <p className="text-sm text-gray-400">
              Supported format: .xlsx
            </p>
          </div>
        </div>
        
        <input
          id="file-input"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {uploadedFile && (
        <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <FileSpreadsheet className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800">
              {uploadedFile.name}
            </p>
            <p className="text-xs text-green-600">
              {(uploadedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUploadedFile(null)}
            className="text-green-700 border-green-300 hover:bg-green-100"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
