
import React, { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, Info, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { parseExcelFile, ParseResult, ParsedMember } from '@/utils/excelParser';
import { Badge } from '@/components/ui/badge';

interface FileUploadProps {
  onMembersParsed?: (members: ParsedMember[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onMembersParsed }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const processFile = useCallback(async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setParseResult(null);
    
    try {
      const result = await parseExcelFile(file);
      setParseResult(result);
      
      if (result.members.length > 0 && onMembersParsed) {
        onMembersParsed(result.members);
      }
    } catch (error) {
      setParseResult({ 
        members: [], 
        errors: ['Failed to process file'],
        warnings: []
      });
    } finally {
      setIsProcessing(false);
    }
  }, [onMembersParsed]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const xlsxFile = files.find(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );
    
    if (xlsxFile) {
      processFile(xlsxFile);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      processFile(file);
    }
  }, [processFile]);

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
              Supported format: .xlsx (Column A: Email, Column B: Tags)
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
            onClick={() => {
              setUploadedFile(null);
              setParseResult(null);
              setIsProcessing(false);
            }}
            className="text-green-700 border-green-300 hover:bg-green-100"
          >
            Remove
          </Button>
        </div>
      )}

      {isProcessing && (
        <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-800">
              Processing Excel file...
            </p>
            <p className="text-xs text-blue-600">
              Extracting emails and tags from columns A & B
            </p>
          </div>
        </div>
      )}

      {parseResult && (
        <div className="space-y-2">
          {parseResult.members.length > 0 && (
            <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">
                  Successfully extracted {parseResult.members.length} member{parseResult.members.length === 1 ? '' : 's'}
                </p>
                <div className="text-xs text-green-600 mt-1 space-y-1">
                  {parseResult.members.slice(0, 3).map((member, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span>{member.email}</span>
                      {member.tags.length > 0 && (
                        <div className="flex gap-1">
                          {member.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {parseResult.members.length > 3 && (
                    <div>... and {parseResult.members.length - 3} more</div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {parseResult.warnings && parseResult.warnings.length > 0 && (
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">
                  {parseResult.warnings.length} warning{parseResult.warnings.length === 1 ? '' : 's'}
                </p>
                <div className="text-xs text-yellow-600 mt-1 space-y-1">
                  {parseResult.warnings.slice(0, 3).map((warning, index) => (
                    <div key={index}>{warning}</div>
                  ))}
                  {parseResult.warnings.length > 3 && (
                    <div>... and {parseResult.warnings.length - 3} more</div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {parseResult.errors.length > 0 && (
            <div className="flex items-start space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-800">
                  {parseResult.errors.length} issue{parseResult.errors.length === 1 ? '' : 's'} found
                </p>
                <div className="text-xs text-orange-600 mt-1 space-y-1">
                  {parseResult.errors.slice(0, 3).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                  {parseResult.errors.length > 3 && (
                    <div>... and {parseResult.errors.length - 3} more</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
