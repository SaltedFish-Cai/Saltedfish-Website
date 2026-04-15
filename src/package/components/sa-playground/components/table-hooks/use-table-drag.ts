import { SaStructureType } from "M_Types";
import { Ref, ref } from "vue";

export const useDragHooks = (tableConfig: Ref<SaStructureType.TableV2[]>, tableData: Ref<any[][]>) => {
  // 拖拽相关变量
  const draggedColumn = ref<number | null>(null);

  // 拖拽开始
  function dragStart(event: DragEvent, index: number) {
    event.stopPropagation();
    event.dataTransfer?.setData("text/plain", index.toString());
    (event.target as HTMLElement).style.opacity = "0.5";
    draggedColumn.value = index;
  }

  // 拖拽结束
  function dragEnd(event: DragEvent) {
    event.stopPropagation();
    (event.target as HTMLElement).style.opacity = "1";
    const items = document.querySelectorAll(".table-header-cell");
    items.forEach(item => item.classList.remove("dragover"));
    draggedColumn.value = null;
  }

  // 拖拽悬停
  function dragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const items = document.querySelectorAll(".table-header-cell");
    items.forEach(item => item.classList.remove("dragover"));
    if (event.currentTarget) {
      (event.currentTarget as HTMLElement).classList.add("dragover");
    }
  }

  // 拖拽进入
  function dragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  // 拖拽离开
  function dragLeave(event: DragEvent) {
    event.stopPropagation();
    if (event.currentTarget) {
      (event.currentTarget as HTMLElement).classList.remove("dragover");
    }
  }

  // 拖拽结束，处理排序
  function drop(event: DragEvent, targetIndex: number) {
    event.preventDefault();
    event.stopPropagation();

    const oldIndex = parseInt(event.dataTransfer!.getData("text/plain"));
    if (oldIndex !== targetIndex) {
      // 重新排列列名
      const newColumnNames = [...tableConfig.value];
      const [removed] = newColumnNames.splice(oldIndex, 1);
      newColumnNames.splice(targetIndex, 0, removed);
      tableConfig.value = newColumnNames;

      // 重新排列表格数据
      tableData.value = tableData.value.map(row => {
        const newRow = [...row];
        const [removedValue] = newRow.splice(oldIndex, 1);
        newRow.splice(targetIndex, 0, removedValue);
        return newRow;
      });
    }

    // 重置拖拽状态
    (event.target as HTMLElement).style.opacity = "1";
    const items = document.querySelectorAll(".table-header-cell");
    items.forEach(item => item.classList.remove("dragover"));
  }

  return {
    dragStart,
    dragEnd,
    dragOver,
    dragEnter,
    dragLeave,
    drop
  };
};
