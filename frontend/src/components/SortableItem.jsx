import {useSortable, defaultAnimateLayoutChanges} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { MdDragIndicator } from "react-icons/md";

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.id,
    animateLayoutChanges: defaultAnimateLayoutChanges,
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? 'transform 200ms ease',
  };
  
  return (
    <div 
    ref={setNodeRef} 
    style={style}
    {...attributes}>
        {props.children}
        <MdDragIndicator className="sort cursor-move" {...listeners}/>
    </div>
  );
}